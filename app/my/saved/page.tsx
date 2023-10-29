'use client';
import "./saved.css"
import { Button, Container, FormControl, InputLabel, MenuItem, TextField, Unstable_Grid2 as Grid, touchRippleClasses } from "@mui/material";
import { useRef, useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import RecipeCard from "@/lib/RecipeCard";

export interface RecipeIngredientData {
    name: string;
    amount: string;
    diet_pescatarian: boolean | unknown;
    diet_vegetarian: boolean | unknown;
    diet_vegan: boolean | unknown;
    diet_gluten_free: boolean | unknown;
    diet_halal: boolean | unknown;
    allergen_wheat: boolean | unknown;
    allergen_dairy: boolean | unknown;
    allergen_egg: boolean | unknown;
    allergen_soy: boolean | unknown;
    allergen_fish: boolean | unknown;
    allergen_shellfish: boolean | unknown;
    allergen_treenuts: boolean | unknown;
    allergen_peanuts: boolean | unknown;
    allergen_sesame: boolean | unknown;
}

export class Recipe {
    id: number
    ownerName: string;
    name: string;
    instructions: string;
    description: string;
    time: number;
    yield: string;
    ingredients: Array<RecipeIngredientData>;
    
    diet_pescatarian: boolean | unknown;
    diet_vegetarian: boolean | unknown;
    diet_vegan: boolean | unknown;
    diet_gluten_free: boolean | unknown;
    diet_halal: boolean | unknown;
    allergen_wheat: boolean | unknown;
    allergen_dairy: boolean | unknown;
    allergen_egg: boolean | unknown;
    allergen_soy: boolean | unknown;
    allergen_fish: boolean | unknown;
    allergen_shellfish: boolean | unknown;
    allergen_treenuts: boolean | unknown;
    allergen_peanuts: boolean | unknown;
    allergen_sesame: boolean | unknown;

    constructor(data: RecipeData) {
        this.id = data.id;
        this.ownerName = data.ownerName;
        this.name = data.name;
        this.instructions = data.instructions;
        this.description = data.description;
        this.time = data.time;
        this.yield = data.yield;
        this.ingredients = data.ingredients;

        data.ingredients.forEach((ingredient) => {
            if (ingredient.allergen_dairy === true) {
                this.allergen_dairy = true
            } else if (this.allergen_dairy === false) {
                this.allergen_dairy = ingredient.allergen_dairy;
            }
            if (ingredient.allergen_egg === true) {
                this.allergen_egg = true
            } else if (this.allergen_egg === false) {
                this.allergen_egg = ingredient.allergen_egg;
            }
            
            if (ingredient.allergen_fish === true) {
                this.allergen_fish = true
            } else if (this.allergen_fish === false) {
                this.allergen_fish = ingredient.allergen_fish;
            }
            
            if (ingredient.allergen_peanuts === true) {
                this.allergen_peanuts = true
            } else if (this.allergen_peanuts === false) {
                this.allergen_peanuts = ingredient.allergen_peanuts;
            }
            
            if (ingredient.allergen_sesame === true) {
                this.allergen_sesame = true
            } else if (this.allergen_sesame === false) {
                this.allergen_sesame = ingredient.allergen_sesame;
            }
            
            if (ingredient.allergen_shellfish === true) {
                this.allergen_shellfish = true
            } else if (this.allergen_shellfish === false) {
                this.allergen_shellfish = ingredient.allergen_shellfish;
            }
            
            if (ingredient.allergen_soy === true) {
                this.allergen_soy = true
            } else if (this.allergen_soy === false) {
                this.allergen_soy = ingredient.allergen_soy;
            }
            if (ingredient.allergen_treenuts === true) {
                this.allergen_treenuts = true
            } else if (this.allergen_treenuts === false) {
                this.allergen_treenuts = ingredient.allergen_treenuts;
            }
            if (ingredient.allergen_wheat === true) {
                this.allergen_wheat = true
            } else if (this.allergen_wheat === false) {
                this.allergen_wheat = ingredient.allergen_wheat;
            }
            if (ingredient.diet_gluten_free === false) {
                this.diet_gluten_free = false
            } else if (this.diet_gluten_free === true) {
                this.diet_gluten_free = ingredient.diet_gluten_free;
            }
            if (ingredient.diet_halal === false) {
                this.diet_halal = false
            } else if (this.diet_halal === true) {
                this.diet_halal = ingredient.diet_halal;
            }
            if (ingredient.diet_pescatarian === false) {
                this.diet_pescatarian = false
            } else if (this.diet_pescatarian === true) {
                this.diet_pescatarian = ingredient.diet_pescatarian;
            }
            if (ingredient.diet_vegan === false) {
                this.diet_vegan = false
            } else if (this.diet_vegan === true) {
                this.diet_vegan = ingredient.diet_vegan;
            }
            if (ingredient.diet_vegetarian === false) {
                this.diet_vegetarian = false
            } else if (this.diet_vegetarian === true) {
                this.diet_vegetarian = ingredient.diet_vegetarian;
            }
            

        })
    }
}

export interface RecipeData {
    id: number;
    ownerName: string;
    name: string;
    instructions: string;
    description: string;
    time: number;
    yield: string;
    ingredients: Array<RecipeIngredientData>;
}

export default function Page() {
  //const [sortParam, setSortParam] = React.useState(0);

  const [results, setResults] = useState<Array<Recipe>>();

  /*const handleChange = (event: SelectChangeEvent) => {
    setSortParam(event.target.value as string);
  };*/

  React.useEffect(() => {
    fetch("/api/user/saved", {
        method:"GET",
    })
    .then((res) => res.json())
    .then((data: Array<RecipeData>) => {
        setResults(data.map((recipeData: RecipeData) => new Recipe(recipeData)))
    })
  }, [])

  return (
      <>
      {/*<Grid container spacing={2}>
        <Grid>
        <FormControl fullWidth>
            <InputLabel id="sort-parameter-select-label">Age</InputLabel>
            <Select
                labelId="sort-parameter-select-label"
                id="sort-parameter-select"
                value={sortParam}
                label="Sort By"
                onChange={handleChange}
            >
                <MenuItem value={0}>Name (Ascending)</MenuItem>
                <MenuItem value={1}>Name (Descending)</MenuItem>
                <MenuItem value={2}>Thirty</MenuItem>
            </Select>
        </FormControl>
        </Grid>
        <Grid>
          <Button onClick={() => search()} variant="contained" size="medium">Search</Button>
        </Grid>
  </Grid>*/}
      <Container id="resultsContainer">
        { results ? results.map((recipe: Recipe) => <RecipeCard key={recipe.id} recipe={recipe}/>) : null}
      </Container>
      </>
    );
}