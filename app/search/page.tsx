"use client"
import './Search.css';
import { Box, TextField, Container, Typography, Card, CardContent, Collapse, FormGroup, FormControlLabel, Checkbox, BoxProps, Button, InputAdornment, IconButton } from '@mui/material';

import RecipeCard from '../lib/RecipeCard';
import { useEffect, useRef } from 'react';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
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

  const handleExpandClick = () => {
    setExpanded(true);
  };

  const SearchBar = () => {
    const ref = useOutsideClick(() => {
        setExpanded(false);
    });

  const handleSearchSubmit = () => {

  }
  
    return (
      <Card ref={ref}>
        <TextField onClick={handleExpandClick} label="Search" fullWidth
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
                  <FormControlLabel control={<Checkbox />} label="Vegetarian" />
                  <FormControlLabel control={<Checkbox />} label="Pescatarian" />
                  <FormControlLabel control={<Checkbox />} label="Vegan" />
                  <FormControlLabel control={<Checkbox />} label="Halal" />
                  <FormControlLabel control={<Checkbox />} label="Gluten-Free" />
                </FormGroup>
              </Item>
              <Item>
                <Typography paragraph>Allergens to Avoid:</Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Eggs" />
                  <FormControlLabel control={<Checkbox />} label="Wheat" />
                  <FormControlLabel control={<Checkbox />} label="Dairy" />
                  <FormControlLabel control={<Checkbox />} label="Peanuts" />
                  <FormControlLabel control={<Checkbox />} label="Shellfish" />
                </FormGroup>
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