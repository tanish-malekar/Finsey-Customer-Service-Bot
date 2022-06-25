import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Grid, TextField } from "@mui/material";

const ChatTextField = () => {
  return (
    <Grid
      item
      xs={12}
      width="100%"
      height="50px"
      sx={{
        position: "absolute",
        left: 0,
        bottom: -2,
        zIndex: 100,
        backgroundColor: "rgba(241, 242, 241, 1)",
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        sx={{
          height: "100%",
          "& .MuiInputBase-input": {
            height: "50px",
            padding: " 0px 10px",
            border: "none",
            outline: "none",
          },
        }}
      />
      <SendIcon
        sx={{
          position: "absolute",
          right: "5px",
          bottom: "50%",
          transform: "translateY(50%)",
        }}
      />
    </Grid>
  );
};

export default ChatTextField;
