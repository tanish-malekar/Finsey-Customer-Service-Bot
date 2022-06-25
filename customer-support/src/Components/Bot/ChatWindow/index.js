import { Fade, Grid } from "@mui/material";
import React from "react";
import { useStore } from "../../../store";
import { CHAT_WINDOW } from "../../../constants";
import ChatHeader from "./ChatHeader";
import ChatTextField from "./ChatTextField";
import Message from "../Message";

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

const ChatWindow = () => {
  const [state] = useStore();
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
          {dummyChat.map((chat, index) => (
            <Message {...chat} key={index} />
          ))}
        </Grid>
            <ChatTextField />
      </Grid>
    </Fade>
  );
};

export default ChatWindow;
