"use client"
import React, { useState } from 'react';
import { Box, BoxProps } from '@mui/material';
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

export interface Ingredient {
    name: string;
    amount: string;
}

export interface Recipe {
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
}

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

export default function RecipeCard() {
    
    const [clicked, setClicked] = useState(false)
    const handleFavoriteClick = () => {
        if (clicked) {
            setClicked(false);
        } else {
            setClicked(true)
        }
    }

    return (
        <Card variant="outlined" className='recipeDisplay' sx={{ minWidth: 275 }}>
            <CardActionArea onClick={() => {window.alert("Click")}}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 0.75 }}>
                        Recipe Name
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Box sx={{ mb: 0.75 }}>
                            <Typography>
                                Time:
                            </Typography>
                            <Typography sx={{ ml: 1 }}>
                                X Minutes
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 0.75 }}>
                            <Typography>
                                Yield:
                            </Typography>
                            <Typography sx={{ ml: 1 }}>
                                X Servings
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body1">
                        Description
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