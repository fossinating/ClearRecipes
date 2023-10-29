import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/backend_lib/auth';
import { db } from '@/backend_lib/db/drizzle';
import { ingredients, recipeBookmarks, recipes, recipesToIngredients, users } from '@/backend_lib/db/schema';
import { and, desc, eq } from 'drizzle-orm';

export const runtime = 'edge';

export interface BookmarkRecipeParams {
    recipeID: number;
    bookmark: boolean;
}
 
export async function POST(req: NextRequest) {
    const session = await auth()
    if (session && session?.user) {

        let data: BookmarkRecipeParams = await req.json();
        if (!data || !data.recipeID || data.bookmark === undefined) {
            return NextResponse.json({
                errMessage: "Invalid data"
            }, {status: 400})
        }
        if (true) {
            const recipeBookmark = await db.query.recipeBookmarks.findFirst({
                where: (recipeBookmarks, {eq, and}) => and(eq(recipeBookmarks.userId, session.user.id), eq(recipeBookmarks.recipeID, data.recipeID))
            })

            if (data.bookmark) {
                if (recipeBookmark !== null) {
                    return NextResponse.json({ 
                        
                    }, {status: 200});
                }

                const recipeBookmarkCreate = await db.insert(recipeBookmarks).values({
                    userId: session.user.id,
                    recipeID: data.recipeID
                })

                if (recipeBookmarkCreate === null) {
                    return NextResponse.json({
                        errMessage: "Failed to bookmark recipe"
                    }, {status: 400})
                }
            } else {
                if (recipeBookmark === null) {
                    return NextResponse.json({ 
                        
                    }, {status: 200});
                }

                const recipeBookmarkDelete = await db.delete(recipeBookmarks).where(and(eq(recipeBookmarks.userId, session.user.id), eq(recipeBookmarks.recipeID, data.recipeID)))

                if (recipeBookmarkDelete === null) {
                    return NextResponse.json({
                        errMessage: "Failed to bookmark recipe"
                    }, {status: 400})
                }
            }

            return NextResponse.json({ 
                
            }, {status: 200});
        }
    } else {
        // Not Signed in
        return NextResponse.json({}, {status: 401});
    }
}