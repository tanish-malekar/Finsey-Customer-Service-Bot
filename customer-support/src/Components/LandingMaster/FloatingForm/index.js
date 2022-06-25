import { Grid, Typography } from "@mui/material";
import React from "react";
import MainPaper from "./MainPaper";
import QuoteForm from "./QuoteForm";
import ServiceStack from "./ServiceStack";

const FloatingForm = () => {
  return (
    <Grid item xs={12} height="40vh" padding={2}>
      <MainPaper variant="elevation" elevation={6}>
        <Grid
          container
          flexDirection="row"
          justify-context="space-between"
          height="100%"
        >
          <Grid item xs={12}>
            <ServiceStack />
          </Grid>
          <Grid item xs={12}>
            <QuoteForm />
          </Grid>
          <Grid item xs={12} paddingLeft={3}>
            <Typography
              color="primary.main"
              sx={{ textDecoration: "underline" }}
            >
              I own a new car
            </Typography>
          </Grid>
        </Grid>
      </MainPaper>
    </Grid>
  );
};

export default FloatingForm;
