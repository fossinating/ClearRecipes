import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/backend_lib/auth';
import { db } from '@/backend_lib/db/drizzle';
import { ingredientRelations, ingredients, recipes, recipesToIngredients, users } from '@/backend_lib/db/schema';
import { sql } from 'drizzle-orm';

export const runtime = 'edge';

export interface RecipeSearchParams {
    page: number | unknown;
    keywords: string | unknown;
    diet_pescatarian: boolean | unknown,
    diet_vegetarian: boolean | unknown,
    diet_vegan: boolean | unknown,
    diet_gluten_free: boolean | unknown,
    diet_halal: boolean | unknown,
    allergen_wheat: boolean | unknown,
    allergen_dairy: boolean | unknown,
    allergen_egg: boolean | unknown,
    allergen_soy: boolean | unknown,
    allergen_fish: boolean | unknown,
    allergen_shellfish: boolean | unknown,
    allergen_treenuts: boolean | unknown,
    allergen_peanuts: boolean | unknown,
    allergen_sesame: boolean | unknown,
}
 
export async function POST(req: NextRequest) {
    const session = await auth()
    let data: RecipeSearchParams = await req.json();
    if (!data) {
        return NextResponse.json({
            errMessage: "Invalid data"
        }, {status: 400})
    }
    if (true) {

        const recipe_ids = await db.execute(sql`select \`recipe\`.\`id\` from recipe where (\`recipe\`.\`isPublic\` OR \`recipe\`.\`ownerID\`=${session && session.user ? session.user.id : ""}) and not exists(
            select * from recipeToIngredient where \`recipe\`.\`id\`=\`recipeToIngredient\`.recipeID and exists(
                select * from ingredient where \`ingredient\`.\`id\`=\`recipeToIngredient\`.ingredientID and ((${ingredients.allergen_fish} AND ${data.allergen_fish as boolean}) OR
                    (${ingredients.allergen_peanuts} AND ${data.allergen_peanuts as boolean}) OR
                    (${ingredients.allergen_dairy} AND ${data.allergen_dairy as boolean}) OR 
                    (${ingredients.allergen_egg} AND ${data.allergen_egg as boolean}) OR
                    (${ingredients.allergen_sesame} AND ${data.allergen_sesame as boolean}) OR
                    (${ingredients.allergen_shellfish} AND ${data.allergen_shellfish as boolean}) OR
                    (${ingredients.allergen_soy} AND ${data.allergen_soy as boolean}) OR
                    (${ingredients.allergen_treenuts} AND ${data.allergen_treenuts as boolean}) OR
                    (${ingredients.allergen_wheat} AND ${data.allergen_wheat as boolean}) OR
                    ((NOT ${ingredients.diet_gluten_free}) AND ${data.diet_gluten_free as boolean}) OR
                    ((NOT ${ingredients.diet_halal}) AND ${data.diet_halal as boolean}) OR
                    ((NOT ${ingredients.diet_vegan}) AND ${data.diet_vegan as boolean}) OR
                    ((NOT ${ingredients.diet_vegetarian}) AND ${data.diet_vegetarian as boolean}) OR
                    ((NOT ${ingredients.diet_pescatarian}) AND ${data.diet_pescatarian as boolean}))))`);

        console.log("Recipe IDS");
        console.log(recipe_ids.rows);
        if (recipe_ids.rows.length > 0) {
            
            const recipe_results = await db.query.recipes.findMany({
                where: (recipes, {inArray}) => inArray(recipes.id, recipe_ids.rows.map((row => row.id))),
                with: {
                    recipesToIngredients: {
                        with: {
                            ingredient: true
                        }
                    }
                }
            })
            return NextResponse.json({ 
                recipes: recipe_results.map((recipeData) => {
                    return ({
                        ...recipeData,
                        ingredients: recipeData.recipesToIngredients.map((recipeToIngrient) => ({name: recipeToIngrient.ingredient, quantity: recipeToIngrient.quantity}))
                    })
                }).map(({recipesToIngredients, ...rest}) => rest)
            }, {status: 200});
        } else {
            
            return NextResponse.json({ 
                recipes: []
            }, {status: 200});
        }



    }
}