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
