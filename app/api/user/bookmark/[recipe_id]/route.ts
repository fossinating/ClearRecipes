import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/backend_lib/auth';
import { db } from '@/backend_lib/db/drizzle';
import { ingredients, recipeBookmarks, recipes, recipesToIngredients, users } from '@/backend_lib/db/schema';
import { and, desc, eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function GET(req: NextRequest, {params}: {params: {recipe_id: number}}) {
    const session = await auth()
    if (session && session?.user) {
        
        const recipeBookmark = await db.query.recipeBookmarks.findFirst({
            where: (recipeBookmarks, {eq, and}) => and(eq(recipeBookmarks.userId, session.user.id), eq(recipeBookmarks.recipeID, params.recipe_id))
        })

        return NextResponse.json({ 
            bookmarked: recipeBookmark !== null
        }, {status: 200});
    }
}