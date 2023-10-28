'use client'
import * as React from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    FormHelperText
    } from '@mui/material';
import { UploadRecipeParams } from "@/api/recipe/upload/route";
import { useRouter } from 'next/navigation';

class Ingredient {
    name: string;
    amount: string;
    nameError: string | undefined;
    amountError: string | undefined;

    constructor() {
        this.name = "";
        this.amount = "";
        this.nameError = undefined;
        this.amountError = undefined;
    }
}

export default function Page() {

    let recipeName = React.useRef<HTMLInputElement>();
    let [nameError, setNameError] = React.useState<string>()
    let recipeDesc = React.useRef<HTMLInputElement>();
    let [descError, setDescError] = React.useState<string>()
    let recipeInstructions = React.useRef<HTMLInputElement>();
    let [instructionsError, setInstructionsError] = React.useState<string>()
    let recipeHours = React.useRef<HTMLInputElement>();
    let [hourError, setHourError] = React.useState<string>()
    let recipeMinutes = React.useRef<HTMLInputElement>();
    let [minError, setMinError] = React.useState<string>()
    let recipeYield = React.useRef<HTMLInputElement>();
    let [yieldError, setYieldError] = React.useState<string>()
    const router = useRouter()
    
    let [ingredients, setIngredients] = React.useState<Array<Ingredient>>([new Ingredient()]);

    const updateIngredientName = (index: number, newName: string) => {
        setIngredients(ingredients.map((ingredient: Ingredient, _index: number) => {
            if (index === _index) {
                ingredient.name = newName;
                return ingredient;
            } else {
                return ingredient;
            }
        }))
    }

    const updateIngredientAmount = (index: number, newAmount: string) => {
        setIngredients(ingredients.map((ingredient: Ingredient, _index: number) => {
            if (index === _index) {
                ingredient.amount = newAmount;
                return ingredient;
            } else {
                return ingredient;
            }
        }))
    }

    const addIngredient = () => {
        setIngredients([...ingredients, new Ingredient()]);
    }

    const deleteIngredient = (index: number) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((ingredient, i) => i !== index));
        }
    }

    const submitForm = async () => {
        let flag = false;
        if (!recipeName.current?.value || recipeName.current?.value?.length > 100) {
            setNameError("Error: recipe name is too long");
            flag = true;
        } else {
            setNameError(undefined);
        }
        if (recipeName.current?.value?.length === 0) {
            setNameError("Required");
            flag = true;
        } else {
            setNameError(undefined);
        }
        if (recipeDesc.current?.value?.length === 0) {
            setDescError("Required");
            flag = true;
        } else {
            setDescError(undefined);
        }
        if (recipeInstructions.current?.value?.length === 0) {
            setInstructionsError("Required");
            flag = true;
        } else {
            setInstructionsError(undefined);
        }
        if (recipeHours.current?.value?.length === 0) {
            setHourError("Required");
            flag = true;
        } else if (isNaN(Number(recipeHours.current?.value))) {
            setHourError("Must be a number");
            flag = true;
        } else {
            setHourError(undefined);
        }
        if (recipeMinutes.current?.value?.length === 0) {
            setMinError("Required");
            flag = true;
        } else if (isNaN(Number(recipeMinutes.current?.value))) {
            setMinError("Must be a number");
            flag = true;
        } else {
            setMinError(undefined);
        }
        if (recipeYield.current?.value?.length === 0) {
            setYieldError("Required");
            flag = true;
        } else {
            setYieldError(undefined);
        }
        setIngredients(ingredients.map((ingredient: Ingredient, _index: number) => {
            if (ingredient.name.length === 0) {
                ingredient.nameError = "Required";
                flag = true;
            } else {
                ingredient.nameError = undefined;
            }
            if (ingredient.amount.length === 0) {
                ingredient.amountError = "Required";
                flag = true;
            } else {
                ingredient.amountError = undefined;
            }
            return ingredient;
        }))
        if (!flag) {
            const response = await fetch("/api/recipe/upload", {
                method: "POST",
                body: JSON.stringify({
                    name: recipeName.current?.value,
                    instructions: recipeInstructions.current?.value,
                    description: recipeDesc.current?.value,
                    time: parseInt(recipeHours.current?.value as string)*60 + parseInt(recipeMinutes.current?.value as string),
                    yield: recipeYield.current?.value,
                    ingredients: ingredients.map((ingredient) => {return {name: ingredient.name, amount: ingredient.amount}})
                } as UploadRecipeParams),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            }).then((response) => response.json())
            .then(data => router.push("/recipe/"+data["recipeID"]))
        }
    }

    return (
      <Box>
        <Typography variant='h3'>Upload Recipe</Typography>
        <Box>
            <TextField error={nameError !== undefined} variant="outlined" label="Name" inputRef={recipeName} helperText={nameError}/>
            <TextField multiline error={descError !== undefined} variant="outlined" label="Description" inputRef={recipeDesc} helperText={descError}/>
            <TextField multiline error={instructionsError !== undefined} variant="outlined" label="Instructions" inputRef={recipeInstructions} helperText={instructionsError}/>
            <TextField error={hourError !== undefined} variant="outlined" label="Hours" inputRef={recipeHours} helperText={hourError}/>
            <TextField error={minError !== undefined} variant="outlined" label="Minutes" inputRef={recipeMinutes} helperText={minError}/>
            <TextField error={yieldError !== undefined} variant="outlined" label="Yield" inputRef={recipeYield} helperText={yieldError}/>

            {ingredients.map((ingredient, index) => 
            <Box key={index}>
            <TextField error={ingredient.nameError !== undefined} helperText={ingredient.nameError} variant="outlined" label="Ingredient Name" value={ingredient.name} onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => {updateIngredientName(index, event.target.value)}}/>
            <TextField error={ingredient.amountError !== undefined} helperText={ingredient.amountError} variant="outlined" label="Ingredient Amount" value={ingredient.amount} onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => {updateIngredientAmount(index, event.target.value)}}/>
            <Button variant="contained" onClick={() => deleteIngredient(index)}>Delete</Button>
            </Box>)}
            <Button variant="contained" onClick={() => addIngredient()}>Add Ingredient</Button>
            
            <Button variant="contained" onClick={() => submitForm()}>Submit</Button>
        </Box>
      </Box>
    );
  }