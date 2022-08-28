import React, { useState, useEffect } from "react";

import "./App.css";
import { PackageCard } from "./Components/PackageCard";
import { Grid, Box, Stack, Typography, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  // state variables
  const [registries, setRegistries] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // theme variable to handle different screen size
  const theme = createTheme();
  theme.typography.h2 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  // handler functions
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // fetch API with query size=20, to limit search results in case of huge data
  useEffect(() => {
    fetch("https://registry.npmjs.com/-/v1/search?text=<searchstring>&size=20")
      .then((response) => response.json())
      .then((data) => setRegistries(data.objects));
  }, []);

  return (
    <div className="App">
      <div className="App_banner">
        <Stack>
          <ThemeProvider theme={theme}>
            <Typography variant="h2">REACT ASSIGNMENT</Typography>
          </ThemeProvider>
        </Stack>
      </div>
      <div className="App_body">
        <Box>
          <Stack sx={{ height: "50px", marginTop: "20px" }}>
            <TextField
              id="outlined-basic"
              label="Search..."
              variant="standard"
              onChange={handleSearchChange}
            />
          </Stack>
          <Grid
            container
            sx={{
              marginTop: "20px",
              minWidth: "70vw",
            }}
          >
            {registries
              .filter((filteredReg: any) => {
                if (searchTerm === "") {
                  return filteredReg;
                } else if (
                  filteredReg["package"]["name"]
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return filteredReg;
                }
              })
              .map((registry: any) => (
                <Grid
                  key={registry["package"]["name"]}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <PackageCard registry={registry} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default App;
