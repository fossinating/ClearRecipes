"use client"
import './Search.css';
import { Box, TextField, Container, Typography, Card, CardContent, Collapse, FormGroup, FormControlLabel, Checkbox, BoxProps, Button, InputAdornment, IconButton } from '@mui/material';

import RecipeCard from '../lib/RecipeCard';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//import reportWebVitals from './reportWebVitals';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

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

export default function Page() {

  const [expanded, setExpanded] = React.useState(false);
  let keyword = React.useRef<HTMLInputElement>();
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [halal, setHalal] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [pescatarian, setPescatarian] = useState(false);
  const [eggs, setEggs] = useState(false);
  const [dairy, setDairy] = useState(false);
  const [wheat, setWheat] = useState(false);
  const [peanuts, setPeanuts] = useState(false);
  const [treenuts, setTreenuts] = useState(false);
  const [soy, setSoy] = useState(false);
  const [fish, setFish] = useState(false);
  const [shellfish, setShellfish] = useState(false);
  const [sesame, setSesame] = useState(false);

  const handleExpandClick = () => {
    setExpanded(true);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
  }, []);
  
  const SearchBar = () => {
    const ref = useOutsideClick(() => {
        setExpanded(false);
    });
    const handleSearchSubmit = () => {
      let keyphrase = "";
      if (keyword.current !== undefined) {
        keyphrase = keyword.current.value;
      }
      let paramsObj = {
        keyword: keyphrase,
        vegetarian: vegetarian.toString(),
        vegan: vegan.toString(),
        halal: halal.toString(),
        pescatarian: pescatarian.toString(),
        glutenFree: glutenFree.toString(),
        eggs: eggs.toString(), 
        dairy: dairy.toString(), 
        wheat: wheat.toString(), 
        peanuts: peanuts.toString(), 
        treenuts: treenuts.toString(), 
        fish: fish.toString(), 
        shellfish: shellfish.toString(), 
        soy: soy.toString(), 
        sesame: sesame.toString() };
      console.log(paramsObj);
    }
  
    return (
      <Card ref={ref}>
        <TextField onClick={handleExpandClick} label="Search" fullWidth inputRef={keyword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" onClick={handleSearchSubmit}>
                <SearchIcon />
              </Button>
            </InputAdornment>
          )
        }}
      />
        <Collapse in={expanded}>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Item>
                <Typography paragraph>Dietary Restrictions:</Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={vegetarian} onChange={() => (setVegetarian(!vegetarian))} />} label="Vegetarian" />
                  <FormControlLabel control={<Checkbox checked={pescatarian} onChange={() => (setPescatarian(!pescatarian))} />} label="Pescatarian" />
                  <FormControlLabel control={<Checkbox checked={vegan} onChange={() => (setVegan(!vegan))} />} label="Vegan" />
                  <FormControlLabel control={<Checkbox checked={halal} onChange={() => (setHalal(!halal))} />} label="Halal" />
                  <FormControlLabel control={<Checkbox checked={glutenFree} onChange={() => (setGlutenFree(!glutenFree))} />} label="Gluten-Free" />
                </FormGroup>
              </Item>
              <Item>
                <Typography paragraph>Allergens to Avoid:</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <Item>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox checked={eggs} onChange={() => (setEggs(!eggs))} />} label="Eggs" />
                      <FormControlLabel control={<Checkbox checked={wheat} onChange={() => (setWheat(!wheat))} />} label="Wheat" />
                      <FormControlLabel control={<Checkbox checked={dairy} onChange={() => (setDairy(!dairy))} />} label="Dairy" />
                      <FormControlLabel control={<Checkbox checked={peanuts} onChange={() => (setPeanuts(!peanuts))} />} label="Peanuts" />
                      <FormControlLabel control={<Checkbox checked={treenuts} onChange={() => (setTreenuts(!treenuts))} />} label="Tree Nuts" />
                    </FormGroup>
                  </Item>
                  <Item>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox checked={fish} onChange={() => (setFish(!fish))} />} label="Fish" />
                      <FormControlLabel control={<Checkbox checked={shellfish} onChange={() => (setShellfish(!shellfish))} />} label="Shellfish" />
                      <FormControlLabel control={<Checkbox checked={soy} onChange={() => (setSoy(!soy))} />} label="Soy" />
                      <FormControlLabel control={<Checkbox checked={sesame} onChange={() => (setSesame(!sesame))} />} label="Sesame" />
                    </FormGroup>
                  </Item>
                </Box>
              </Item>
            </Box>
          </CardContent>
      </Collapse>
      </Card>
    );
  };
  
  return (
    <Box>
      <Typography variant='h3'>All Recipes</Typography>
      <SearchBar />
      <Container id="recipeContainer">
        <RecipeCard />
        <RecipeCard />
      </Container>
    </Box>
  );
}