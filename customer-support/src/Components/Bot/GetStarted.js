import React from "react";
import WhiteLogo from "../../images/logoWhite.svg";
import Language from "../../images/language.svg";
import Dash from "../../images/dash.svg";
import { Fade, Grid, Typography } from "@mui/material";
import Style from "./BotStyle.module.css";
import Button from "../Button";
import { SELECT_MODE, GET_STARTED } from "../../constants";
import { useStore } from "../../store";
import { setBotStepper, toggleShowBot } from "../../reducer/BotStepperReducer";
const GetStarted = () => {
  const [state, dispatch] = useStore();

  const onGetStarted = () => {
    dispatch(setBotStepper(SELECT_MODE));
  };

  return (
    <Fade in={state.botStepper === GET_STARTED} unmountOnExit>
      <Grid container padding={2} minWidth="100%">
        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>
            <img src={WhiteLogo} alt="bajaj" />
          </Grid>
          <Grid container item xs={4} justifyContent="space-around">
            <Grid item>
              <div className={Style.GrayButton}>
                <img src={Language} alt="language" width="15px" hight="15px" />
              </div>
            </Grid>
            <Grid item>
              <div className={Style.GrayButton} onClick={()=>{dispatch(toggleShowBot())}}>
                <img src={Dash} alt="close" width="15px" hight="15px"/>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} paddingTop={10} paddingBottom={7} textAlign="center">
          <Typography variant="h5" marginBottom={2}>
            {state.language=='en-US'?"Chat With Finsey":(state.language==='hi-IN'?"फिन्से के साथ बाते":"फिन्से सह बोला")}
          </Typography>
          <Typography variant="body1">
            {state.language=='en-US'?"How can we help you?":(state.language==='hi-IN'?"हम आपकी कैसे मदद कर सकते हैं?":"आम्ही तुम्हाला कशी मदत करू शकतो?")}
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems="center">
          <Button onClick={onGetStarted}>
            {state.language=='en-US'?"GET STARTED":(state.language==='hi-IN'?"शुरू करें":"सुरू करा")}
          </Button>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default GetStarted;
