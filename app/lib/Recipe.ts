

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
    imageSrc: string;
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
        this.imageSrc = data.imageSrc;
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
    imageSrc: string;
    time: number;
    yield: string;
    ingredients: Array<RecipeIngredientData>;
}