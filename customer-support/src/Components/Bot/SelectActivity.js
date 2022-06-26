import React from "react";
import { Fade, Grid, TextField, Typography } from "@mui/material";
import Button from "../Button";
import { CHAT_WINDOW, VOICE_WINDOW } from "../../constants";
import { useStore } from "../../store";
import { setBotStepper, setMode } from "../../reducer/BotStepperReducer";
const SelectActivity = () => {
  const [state, dispatch] = useStore();

  const onChat = () => {
    dispatch(setMode('genaral-queries'));
    // dispatch(setBotStepper(VOICE_WINDOW));
  };
  const onClaim = () => {
    // dispatch(setBotStepper(CHAT_WINDOW));
    dispatch(setMode('claims'));
  };

  return (
    <Fade in={(state.botStepper === CHAT_WINDOW || state.botStepper === VOICE_WINDOW) && !state.mode} unmountOnExit>
      <Grid container padding={2}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h5" marginBottom={2}>
            Chat With Finsey
          </Typography>
          <Typography variant="subtitle2">
            Select what activity you would like to perform.
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems="center" paddingBottom={4}>
          <Button onClick={onChat}>General Queries</Button>
        </Grid>
        <Grid item xs={12} alignItems="center" paddingBottom={4}>
          <Button onClick={onClaim}>File a claim</Button>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default SelectActivity;
