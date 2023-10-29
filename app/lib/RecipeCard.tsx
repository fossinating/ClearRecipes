"use client"
import React, { useEffect, useState } from 'react';
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
import { Recipe } from "@/lib/Recipe";
import { useSession } from 'next-auth/react';

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
    
    const [bookmarked, setBookmarked] = useState(false)
    const handleFavoriteClick = () => {
        if (bookmarked) {
            setBookmarked(false);
        } else {
            setBookmarked(true)
        }

        fetch("/api/user/bookmark", {
            method: "POST",
            body: JSON.stringify({
                recipeID: props.recipe.id,
                bookmark: !bookmarked
            })
        })
    }

    const router = useRouter();
    const session = useSession();


    useEffect(() => {
        if (session) {
            fetch("/api/user/bookmark/"+props.recipe.id, {
                method: "GET"})
            .then((res) => res.json())
            .then((data) => {setBookmarked(data.bookmarked)})
        }
     }, [])



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
                    {bookmarked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
  }