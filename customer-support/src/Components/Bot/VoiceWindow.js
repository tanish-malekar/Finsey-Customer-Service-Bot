import React from 'react';
import { Avatar, Fade, Grid, Typography } from "@mui/material";
import { VOICE_WINDOW } from "../../constants";
import { useStore } from "../../store";
import ChatHeader from './ChatWindow/ChatHeader';
import Message from './Message';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

let dummyChat = [
  {
    from: "bot",
    message: "hey, how can I help you today?",
  },
  {
    from: "user",
    message: "please help me claim my policy",
  },
  {
    from: "bot",
    message: "hey, how can I help you today?",
  },
  {
    from: "user",
    message: "please help me claim my policy",
  },
  {
    from: "bot",
    message: "hey, how can I help you today?",
  },
  {
    from: "user",
    message: "please help me claim my policy",
  },
  {
    from: "bot",
    message: "hey, how can I help you today?",
  },
  {
    from: "user",
    message:
      "please help me claim my policy. please help me claim my policy. please help me claim my policy. please help me claim my policy",
  },
];

const VoiceWindow = ()=>{
    const [botStepper,] = useStore();
    return(
    <Fade in={botStepper === VOICE_WINDOW} unmountOnExit>
      <Grid container>
        <ChatHeader />
        <Grid container xs={12}>
          <Grid 
          container 
          item 
          xs={6} 
          height="100%"
          paddingTop="85px"
          >
            <Grid item xs={12}>
              <Avatar sx={{
                backgroundColor:"primary.dark",
                width:"125px",
                height:"125px",
                margin:"12.5px auto"
              }}>
                <SupportAgentIcon/>
              </Avatar>
              <Typography variant="h6" textAlign="center">Customer Care Associate</Typography>
            </Grid>
          </Grid>
          <Grid
          container
          item
          height="400px"
          paddingTop="85px"
          paddingBottom="65px"
          overflow="auto"
          alignItems="self-start"
          display="block"
          xs={6}
          borderLeft="1px solid gray"
        >
          {dummyChat.map((chat, index) => (
            <Message {...chat} key={index} />
          ))}
        </Grid>
      </Grid>
        </Grid>
    </Fade>
    )
}

export default VoiceWindow;