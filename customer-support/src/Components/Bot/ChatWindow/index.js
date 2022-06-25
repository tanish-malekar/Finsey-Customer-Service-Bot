import { Fade, Grid } from "@mui/material";
import React from "react";
import { useStore } from "../../../store";
import { CHAT_WINDOW } from "../../../constants";

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
  const [botStepper] = useStore();
  return (
    <Fade in={botStepper === CHAT_WINDOW} unmountOnExit>
      <Grid container>
        
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
            {/*message*/}
          ))}
        </Grid>
        
      </Grid>
    </Fade>
  );
};

export default ChatWindow;
