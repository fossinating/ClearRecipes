import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/backend_lib/auth';
import { db } from '@/backend_lib/db/drizzle';

export const runtime = 'edge';
 
export async function GET(req: NextRequest) {
    const session = await auth()
    if (session && session?.user && session.user?.email) {
        const recipes = await db.query.recipes.findMany({
            limit: 3,
            where: (recipes, {eq}) => eq(recipes.ownerID, session.user.id),
            with: {
                recipesToIngredients: {
                    with: {
                        ingredient: true
                    }
                }
            }
        })

        return NextResponse.json({ 
            recipes: recipes.map((recipeData) => {
                return ({
                    ...recipeData,
                    ingredients: recipeData.recipesToIngredients.map((recipeToIngrient) => ({name: recipeToIngrient.ingredient, quantity: recipeToIngrient.quantity}))
                })
            }).map(({recipesToIngredients, ...rest}) => rest)
        }, {status: 200});
    }
}