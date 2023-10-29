'use client';
import { Button, Container, FormControl, InputLabel, MenuItem, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { useRef, useState } from "react";

export interface SnackbarMessage {
  message: string;
  key: number;
}

export default function Page() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  
  let class_numbers: Array<number> = [];

  const search = () => {

  }

  return (
      <>
      <Grid container spacing={2}>
        <Grid>
          <TextField name="search" label="Search Query" inputRef={searchRef} variant="outlined" size="small" margin="none" />
        </Grid>
        <Grid>
          <Button onClick={() => search()} variant="contained" size="medium">Search</Button>
        </Grid>
      </Grid>
      <Container id="resultsContainer">
        
      </Container>
      </>
    );
}