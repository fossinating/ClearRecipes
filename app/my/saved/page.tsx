'use client';
import "./saved.css"
import { Button, Container, FormControl, InputLabel, MenuItem, TextField, Unstable_Grid2 as Grid, touchRippleClasses } from "@mui/material";
import { useRef, useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import RecipeCard from "@/lib/RecipeCard";
import { Recipe, RecipeData } from "../recipes/page";

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