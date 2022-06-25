import React from "react";
import { Fade, Grid, TextField, Typography } from "@mui/material";
import Button from "../Button";
import { CHAT_WINDOW, GET_DETAILS, VOICE_WINDOW } from "../../constants";
import { useStore } from "../../store";
import { setBotStepper } from "../../reducer/BotStepperReducer";
const GetDetails = () => {
  const [state, dispatch] = useStore();

  const onContinue = () => {
    // dispatch(setBotStepper(CHAT_WINDOW));
    dispatch(setBotStepper(VOICE_WINDOW));
  };

  return (
    <Fade in={state.botStepper === GET_DETAILS} unmountOnExit>
      <Grid container padding={2}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h5" marginBottom={2}>
            Chat With Finsey
          </Typography>
          <Typography variant="subtitle2">
            Once you tap continue, Bajaj Finserv will be sending all the
            required steps to the contact provided below, for future help.
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems="center" padding={2}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "16px" }}
          />
        </Grid>
        <Grid item xs={12} alignItems="center" paddingBottom={4}>
          <Button onClick={onContinue}>continue</Button>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default GetDetails;
