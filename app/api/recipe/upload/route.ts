import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/backend_lib/auth';
import { db } from '@/backend_lib/db/drizzle';
import { ingredients, recipes, recipesToIngredients, users } from '@/backend_lib/db/schema';
import { desc } from 'drizzle-orm';

export const runtime = 'edge';

export interface RecipeIngredientParams {
    name: string;
    amount: string;
}

export interface UploadRecipeParams {
    name: string;
    instructions: string;
    description: string;
    time: number;
    yield: string;
    ingredients: Array<RecipeIngredientParams>;
}
 
export async function POST(req: NextRequest) {
    const session = await auth()
    if (session && session?.user && session.user?.email) {

        let data: UploadRecipeParams = await req.json();
        if (!data || !data.name || !data.instructions || !data.description || !data.time || !data.yield || data.name.length < 1 || data.name.length > 100 || data.instructions.length < 1 || data.description.length < 1 || data.time < 1 || data.yield.length < 1) {
            return NextResponse.json({
                errMessage: "Invalid data"
            }, {status: 400})
        }
        if (true) {
            const recipeInsert = await db.insert(recipes).values({
                name: data.name,
                instructions: data.instructions,
                description: data.description,
                time: data.time,
                yield: data.yield,
                isPublic: false,
                ownerID: session.user.id
            })

            if (recipeInsert == null) {
                return NextResponse.json({
                    errMessage: "Failed to create recipe"
                }, {status: 400})
            }

            for (let i = 0; i < data.ingredients.length; i++) {
                let ingredient = await db.query.ingredients.findFirst({
                    where: (ingredients, {eq, and, not, or}) => and(eq(ingredients.name, data.ingredients[i].name), 
                        or(not(ingredients.custom), eq(ingredients.ownerID, session.user.id)))
                })

                if (!ingredient) {
                    const insertIngredient = await db.insert(ingredients).values({
                        name: data.ingredients[i].name,
                        custom: true,
                        ownerID: session.user.id
                    })

                    if (!insertIngredient) {
                        return NextResponse.json({
                            errMessage: "Failed to create ingredient"
                        }, {status: 400})
                    }

                    ingredient = await db.query.ingredients.findFirst({
                        where: (ingredients, {eq, and, not, or}) => and(eq(ingredients.name, data.ingredients[i].name), and(ingredients.custom, eq(ingredients.ownerID, session.user.id)))
                    })
                }

                // Ignore the error about recipeID on the next line, it works fine and i don't know why it is complaining
                const insertIngredientRecipe = await db.insert(recipesToIngredients).values({
                    recipeID: recipeInsert.insertId as unknown as number,
                    ingredientID: ingredient?.id as number,
                    quantity: data.ingredients[i].amount,
                })
            }

            return NextResponse.json({ 
                recipeID: recipeInsert.insertId
            }, {status: 200});
        }
    } else {
        // Not Signed in
        return NextResponse.json({}, {status: 401});
    }
}