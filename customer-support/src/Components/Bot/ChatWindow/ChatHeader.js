import { Grid, Typography } from "@mui/material";
import React from "react";
import RoundLogo from "../../../images/roundLogo.svg";
import Dash from "../../../images/dash.svg";
import Style from "../BotStyle.module.css";

const BotHeader = () => {
  return (
    <Grid
      container
      item
      xs={12}
      padding={2}
      paddingTop={0}
      paddingBottom={0}
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid gray"
      sx={{
        height: "75px",
        width: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "white",
        zIndex: 100,
      }}
    >
      <Grid container item xs={11} alignItems="center">
        <Grid item xs={3}>
          <img src={RoundLogo} alt="logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5" marginBottom={0}>
            Finsey
          </Typography>
          <Typography variant="subtitle2" marginTop={0}>
            Powered by Bajaj Finserv
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={1} alignItems="center">
        <div className={Style.GrayButton}>
          <img src={Dash} alt="close" width="15px" hight="15px" />
        </div>
      </Grid>
    </Grid>
  );
};

export default BotHeader;
