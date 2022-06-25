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
            {state.language=='en-US'?"Chat With Finsey":(state.language=='hi-IN'?"फिन्से के साथ बाते":"फिन्से सह बोला")}
          </Typography>
          <Typography variant="subtitle2">
           {state.language=='en-US'?"Select how you would like to interact with Finsey.":(state.language=='hi-IN'?"चुनें कि आप फिन्से के साथ कैसे इंटरैक्ट करना चाहते हैं":"तुम्हाला फिन्से शी कसा संवाद साधायचा आहे ते निवडा")}
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems="center" paddingBottom={4}>
          <Button onClick={onChat}> 
            {state.language=='en-US'?"CHAT":(state.language=='hi-IN'?"चैट":"चैट")}
          </Button>
        </Grid>
        <Grid item xs={12} alignItems="center" paddingBottom={4}>
          <Button onClick={onCall}>
            {state.language=='en-US'?"VOICE CALL":(state.language=='hi-IN'?"वॉइस कॉल":"वॉइस कॉल")}
          </Button>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default SelectMode;
