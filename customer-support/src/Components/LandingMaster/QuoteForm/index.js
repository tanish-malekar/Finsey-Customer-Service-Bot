import { Grid, TextField } from "@mui/material";
import React from "react";
import Button from "../../../Button";

const QuoteForm = () => {
  return (
    <Grid
      container
      paddingLeft={4}
      paddingRight={4}
      paddingBottom={8}
      justifyContent="space-between"
    >
      <Grid item lg={3}>
        <TextField
          id="registraion-number"
          label="Registration Number"
          variant="standard"
        />
      </Grid>
      <Grid item lg={3}>
        <TextField id="name" label="Name" variant="standard" />
      </Grid>
      <Grid item lg={3}>
        <TextField id="phone-number" label="Phone Number" variant="standard" />
      </Grid>
      <Grid item lg={2}>
        <Button fullWidth>Get Quote</Button>
      </Grid>
    </Grid>
  );
};

export default QuoteForm;
