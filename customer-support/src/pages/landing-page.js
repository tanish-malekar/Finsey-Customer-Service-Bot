import { Grid } from "@mui/material";
import React from "react";
import LandingMaster from "../Components/LandingMaster";
import PrimaryNav from "../Components/PrimaryNav";
import SecondaryNav from "../Components/SecondaryNav";
const LandingPage = () => {
  return (
    <Grid container>
      <SecondaryNav/>
      <PrimaryNav/>
      <LandingMaster/>
    </Grid>
  );
};

export default LandingPage;
