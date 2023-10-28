'use client';
import { Button, Container, FormControl, InputLabel, MenuItem, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRef, useState } from "react";
import { SectionData, useTerms } from "../lib/Common";
import "./Search.css";

export interface SnackbarMessage {
  message: string;
  key: number;
}

export default function Page() {
  const [items, setItems] = useState<SectionData[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);
  
  let class_numbers: Array<number> = [];

  const search: () => {

  }

  return (
      <>
      <Grid container spacing={2}>
        <Grid>
          <TextField name="search" label="Search Query" inputRef={searchRef} variant="outlined" size="small" margin="none" />
        </Grid>
        <Grid>
          <Button onClick={() => loadClasses()} variant="contained" size="medium">Search</Button>
        </Grid>
      </Grid>
      <Container id="resultsContainer">
        { data ? data.classes.map((item) =>
          <ClassDisplay key={item.classNumber} classInfo={item}></ClassDisplay>
        ) : null }
        
      </Container>
      </>
    );
}