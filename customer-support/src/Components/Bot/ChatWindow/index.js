import { Fade, Grid } from "@mui/material";
import React from "react";
import { useStore } from "../../../store";
import { CHAT_WINDOW } from "../../../constants";
import ChatHeader from "./ChatHeader";
import ChatTextField from "./ChatTextField";
import Message from "../Message";
import useChat from "../../../hooks/useChat";

const ChatWindow = () => {
  const [state] = useStore();
  const {messages, sendQuery} = useChat();

  claimMessages = ["Thank you, now please provide the address of the accident.", "Okay, can you please tell us the Kilometer reading of your car?", "Please provide us with a video of your damaged car. The video should be a 360 view of the car. Make sure you focus on all the damages."];

  
  return (
    <Fade in={state.botStepper === CHAT_WINDOW} unmountOnExit>
      <Grid container>
          <ChatHeader />
        <Grid
          container
          item
          height="400px"
          paddingTop="85px"
          paddingBottom="65px"
          overflow="auto"
          alignItems="self-start"
          display="block"
        >
          {messages.map((chat, index) => (
            <Message {...chat} key={index} />
          ))}
        </Grid>
            <ChatTextField sendQuery={sendQuery}/>
      </Grid>
    </Fade>
  );
};

export default ChatWindow;
