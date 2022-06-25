import { Fab, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CaringImage from "../../images/caringImage.svg";
import RedCar from "../../images/redCar.svg";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Bot from "../Bot";

const LandingMaster = () => {
  const [showBot, setShowBot] = useState(false);
  return (
    <Grid
      container
      item
      height="40vh"
      alignItems="center"
      justifyContent="space-between"
      paddingLeft={6}
      paddingRight={6}
    >
      <Grid item xs={8}>
        <img
          src={CaringImage}
          alt="caringly yours"
          style={{ height: "15vh" }}
        />
        <br />
        <Typography variant="h6" color="primary.dark" marginTop={1}>
          There is nothing that we can't help you with. Drive worry-free as you
          have our round-the-clock assistance.
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <img src={RedCar} alt="red car" />
      </Grid>
      <Bot showBot={showBot} />
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: 50, bottom: 50 }}
        onClick={() => {
          setShowBot(!showBot);
        }}
      >
        <SupportAgentIcon />
      </Fab>
    </Grid>
  );
};

export default LandingMaster;
