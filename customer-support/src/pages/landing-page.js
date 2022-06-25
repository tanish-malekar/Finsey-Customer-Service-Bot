import { Grid } from "@mui/material";
import React from "react";
import PrimaryNav from "../Components/PrimaryNav";
import SecondaryNav from "../Components/SecondaryNav";
const LandingPage = () => {
  return (
    <Grid container>
      <SecondaryNav/>
      <PrimaryNav/>
    </Grid>
  );
};

export default LandingPage;
