import React from "react";
import WhiteLogo from "../../images/logoWhite.svg";
import Language from "../../images/language.svg";
import Dash from "../../images/dash.svg";
import { Fade, Grid, Typography } from "@mui/material";
import Style from "./BotStyle.module.css";
import Button from "../Button";
import { GET_DETAILS, GET_STARTED } from "../../constants";
import { useStore } from "../../store";
import { setBotStepper } from "../../reducer/BotStepperReducer";
const GetStarted = () => {
  const [botStepper, dispatch] = useStore();

  const onGetStarted = () => {
    dispatch(setBotStepper(GET_DETAILS));
  };

  return (
    <Fade in={botStepper === GET_STARTED} unmountOnExit>
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
              <div className={Style.GrayButton}>
                <img src={Dash} alt="close" width="15px" hight="15px" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} paddingTop={10} paddingBottom={7} textAlign="center">
          <Typography variant="h5" marginBottom={2}>
            Chat With Finsey
          </Typography>
          <Typography variant="body1">How can we help you?</Typography>
        </Grid>
        <Grid item xs={12} alignItems="center">
          <Button onClick={onGetStarted}>Get Started</Button>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default GetStarted;
