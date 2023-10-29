"use client"
import { Box, List, ListItem, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    
    return (
        <Box>
            <Typography variant='h3'>Eggs Benedict with homemade Hollandaise Sauce</Typography>
            <Typography sx={{ mt: 1 }} variant="h6">
            Eggs Benedict is my favorite breakfast menu item, and it's super easy to make from home! 
            It starts with a toasted english muffin, topped with a slice or two of Canadian bacon, 
            a poached egg, and smothered in traditional Eggs Benedict sauce, called hollandaise sauce.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', mt: 1 }}>
                <Typography variant="h6">Time: 35 Minutes</Typography>
                <Typography variant="h6">Yield: 4 Servings</Typography>
                <Typography variant="h6">Author: Lauren Allen</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Typography variant="h6">Ingredients</Typography>
                <List sx={{ listStyleType: 'disc', ml: 4 }}>
                    <ListItem disablePadding sx={{ display: 'list-item'}}>2 English muffins</ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>4 large eggs</ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>4 slices Canadian bacon</ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>vinegar</ListItem>
                </List>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>For the Hollandaise Sauce</Typography>
                <List sx={{ listStyleType: 'disc', ml: 4 }}>
                    <ListItem disablePadding sx={{ display: 'list-item'}}>4 tablespoons butter</ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>4 egg yolks</ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>4 teaspoons lemon/lime juice</ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>1 tablespoon heavy whipping cream</ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>salt and pepper</ListItem>
                </List>
            </Box>
            <Box>
                <Typography variant="h6">Instructions</Typography>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>For the Hollandaise Sauce</Typography>
                <List sx={{ listStyleType: 'decimal', ml: 4, mt: -1 }}>
                    <ListItem disablePadding sx={{ display: 'list-item'}}>
                        Melt the butter in a small saucepan. In a separate small bowl, beat the egg yolks. 
                        Mix in lemon juice, whipping cream, and salt and pepper.
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        Add a small spoonful of the hot melted butter to the egg mixture and stir well. 
                        Repeat this process adding a spoonful at a time of hot butter to the egg mixture. 
                        Adding the butter slowly, a spoonful at a time, will temper the eggs and ensure they don't curdle.
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        Once the butter has been incorporated, pour the mixture back into the saucepan. 
                        Cook on low heat, stirring constantly, for just 20-30 seconds. Remove from heat 
                        and set aside. It will thicken as it cools. Stir well and add another splash of cream, if needed, to thin.
                    </ListItem>
                </List>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>To poach the eggs</Typography>
                <List sx={{ listStyleType: 'decimal', ml: 4, mt: -1 }}>
                    <ListItem disablePadding sx={{ display: 'list-item'}}>
                    Fill a medium size pot with about 3 inches of water. Bring the water to a boil and then reduce heat until it reaches a simmer. 
                    You should see small bubbles coming to the surface but not rolling.  
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        Add an optional splash of vinegar to the water to help the egg white to stay together once it is in the water.
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        Crack one egg into a small cup. 
                        Lower the egg into the simmering water, gently easing it out of the cup.
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        Cook the egg in simmering water for 3-5 minutes, 
                        depending on how soft you want your egg yolk. 
                        If a white foam forms on top of the water when poaching, skim the foam off of the water with a spoon. 
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        While the egg is cooking, place the slices of Canadian bacon in 
                        a large pan and cook on medium-high heat for about 1 minute on each side.
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                        Remove the poached egg with a slotted spoon.
                    </ListItem>
                </List>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>To assemble</Typography>
                <List sx={{ listStyleType: 'decimal', ml: 4, mt: -1 }}>
                    <ListItem disablePadding sx={{ display: 'list-item'}}>
                        Toast the English muffin. Top each toasted side with a slice or two of Canadian bacon, and then a poached egg. 
                        Top with hollandaise sauce.
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}