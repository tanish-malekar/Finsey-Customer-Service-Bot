import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Grid, TextField } from "@mui/material";
import transalate from "../../../helper/translate";
import { useStore } from "../../../store";

const ChatTextField = ({sendQuery}) => {
  const [value,setValue] = useState("");
  const [state] = useStore();
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
        value={value}
        onChange={(e)=>{setValue(e.target.value)}}
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
        onClick={async ()=>{
          //let englishQuery = await transalate(value, { to: "en" });
          console.log(value)
          sendQuery(value)}}
      />
    </Grid>
  );
};

export default ChatTextField;
