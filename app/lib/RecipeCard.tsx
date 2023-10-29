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
import { Recipe } from '@/my/saved/page';

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

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          p: 1,
          m: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

export default function RecipeCard(props: {recipe: Recipe}) {
    
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
                    <Typography variant="h5" component="div">
                        {props.recipe.name}
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Item>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Time
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {props.recipe.time}
                            </Typography>
                        </Item>
                        <Item>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Yield
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {props.recipe.yield}
                            </Typography>
                        </Item>
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