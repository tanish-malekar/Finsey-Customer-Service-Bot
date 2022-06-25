import React from "react";
import { Fade, Grid, TextField, Typography } from "@mui/material";
import Button from "../Button";
import { CHAT_WINDOW, SELECT_MODE, VOICE_WINDOW } from "../../constants";
import { useStore } from "../../store";
import { setBotStepper } from "../../reducer/BotStepperReducer";
const SelectMode = () => {
  const [state, dispatch] = useStore();

  const onChat = () => {
    dispatch(setBotStepper(CHAT_WINDOW));
    // dispatch(setBotStepper(VOICE_WINDOW));
  };
  const onCall = () => {
    // dispatch(setBotStepper(CHAT_WINDOW));
    dispatch(setBotStepper(VOICE_WINDOW));
  };

  return (
    <Fade in={state.botStepper === SELECT_MODE} unmountOnExit>
      <Grid container padding={2}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h5" marginBottom={2}>
            Chat With Finsey
          </Typography>
          <Typography variant="subtitle2">
            Select how you would like to interact with Finsey.
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems="center" paddingBottom={4}>
          <Button onClick={onChat}>Chat</Button>
        </Grid>
        <Grid item xs={12} alignItems="center" paddingBottom={4}>
          <Button onClick={onCall}>Voice call</Button>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default SelectMode;
