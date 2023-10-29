"use client"
import React, { useState } from 'react';
import { Box, BoxProps, CardMedia } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useRouter } from 'next/navigation';
import { Recipe } from '@/my/recipes/page';

export interface Ingredient {
    name: string;
    amount: string;
}

/*export interface Recipe {
    id: number
    name: string;
    description: string;
    time: string;
    yield: string;
    ingredients: Array<Ingredient>;
    public: boolean;
    dietFlags: {
        vegetarian: boolean,
        vegan: boolean,
        pescatarian: boolean,
        halal: boolean,
        glutenFree: boolean
    };
    allergenFlags: {
        egg: boolean,
        wheat: boolean,
        dairy: boolean,
        peanut: boolean,
        treenut: boolean,
        fish: boolean,
        shellfish: boolean,
        soy: boolean,
        sesame: boolean
    };
    favorite: boolean;
}*/


export default function RecipeCard(props: {recipe: Recipe}) {
    
    const [clicked, setClicked] = useState(false)
    const handleFavoriteClick = () => {
        if (clicked) {
            setClicked(false);
        } else {
            setClicked(true)
        }
    }

    const router = useRouter();


    return (
        <Card variant="outlined" className='recipeCard' sx={{ minWidth: 275 }}>
            <CardActionArea onClick={() => {router.push("/recipe/"+props.recipe.id)}}>
                <CardMedia
                    component="img"
                    height="194"
                    image={props.recipe.imageSrc}
                    alt={props.recipe.name}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.recipe.name}
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Box sx={{ mb: 0.75 }}>
                            <Typography>
                                Time:
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {props.recipe.time} minutes
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 0.75 }}>
                            <Typography>
                                Yield:
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {props.recipe.yield}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2">
                        {props.recipe.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                    {clicked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
  }