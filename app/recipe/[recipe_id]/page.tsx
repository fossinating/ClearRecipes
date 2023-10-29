import { auth } from "@/backend_lib/auth";
import { db } from "@/backend_lib/db/drizzle";
import { recipesToIngredients } from "@/backend_lib/db/schema";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";

export default async function Page({ params }: { params: { recipe_id: number } }) {

    
    const session = await auth()

    console.log(params)
    const recipe = await db.query.recipes.findFirst({
        where: (recipes, {eq, and, or}) => and(eq(recipes.id, params.recipe_id), session?.user ? or(eq(recipes.ownerID, session.user.id), recipes.isPublic) : recipes.isPublic),
        with: {
            recipesToIngredients: {
                with: {
                    ingredient: true
                }
            }
        }
    })

    if (!recipe) {
        return <Box>Could not find requested recipe</Box>
    }
    
    return (
        <Box>
            <Typography variant='h3'>{recipe?.name}</Typography>
            <Typography sx={{ mt: 1 }} variant="h6">
            {recipe?.description}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', mt: 1 }}>
                <Typography variant="h6">Time: { recipe.time && recipe.time > 60 ? recipe.time / 60 + " Hours, " + recipe.time / 60 + " Minutes" : recipe?.time + " Minutes"}</Typography>
                <Typography variant="h6">Yield: {recipe.yield}</Typography>
                <Typography variant="h6">Author: {recipe.name}</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Typography variant="h6">Ingredients</Typography>
                <List sx={{ listStyleType: 'disc', ml: 4 }}>
                    {recipe.recipesToIngredients.map((recipeToIngredients) => 
                        <ListItem key={recipeToIngredients.ingredientID} disablePadding sx={{ display: 'list-item'}}>{recipeToIngredients.quantity} {recipeToIngredients.ingredient.name}</ListItem>
                    )}
                </List>
            </Box>
            <Box>
                <Typography variant="h6">Instructions</Typography>
                {recipe.instructions}
            </Box>
        </Box>
    );
}