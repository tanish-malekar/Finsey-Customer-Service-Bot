import { Fade, Grid } from "@mui/material";
import React from "react";
import { useStore } from "../../../store";
import { CHAT_WINDOW } from "../../../constants";
import ChatHeader from "./ChatHeader";
import ChatTextField from "./ChatTextField";
import Message from "../Message";
import useChat from "../../../hooks/useChat";
import useChatClaim from "../../../hooks/useChatClaim";


const ChatWindow = () => {
  const [state] = useStore();
  const {messages, sendQuery} = useChat();
  const {messagesClaim, messageByUser} = useChatClaim();

  
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
          {state.mode=='claim'?messagesClaim.map((chat, index) => (
            <Message {...chat} key={index} />
          )):messages.map((chat, index) => (
            <Message {...chat} key={index} />
          ))}
        </Grid>
            <ChatTextField sendQuery={state.mode=='claim'?messageByUser:sendQuery}/>
      </Grid>
    </Fade>
  );
};

export default ChatWindow;
