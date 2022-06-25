import { Avatar, Grid, Paper, styled, Typography } from "@mui/material";
import RoundLogo from "../../images/roundLogo.svg";

const MessageComponent = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: "rgba(241, 242, 241, 1)",
  width: "90%",
  margin: "0 auto",
  color: "black",
  padding: "7px",
  display: "block",
}));

const Message = ({ from, message }) => {
  return (
    <Grid
      container
      item
      xs={12}
      padding={0}
      marginTop={2}
      marginBottom={2}
      paddingLeft={1}
      paddingRight={1}
      flexDirection={from === "bot" ? "row" : "row-reverse"}
      justifyContent={from === "bot" ? "left" : "right"}
      alignItems="end"
    >
      <Grid item xs={1}>
        {from === "bot" ? (
          <Avatar sx={{ width: 24, height: 24 }} src={RoundLogo} />
        ) : (
          <Avatar sx={{ width: 18, height: 18, fontSize: "10px" }}>Z</Avatar>
        )}
      </Grid>
      <Grid item xs={10}>
        <MessageComponent>
          <Typography variant="p" fontSize="12px">
            {message}
          </Typography>
        </MessageComponent>
      </Grid>
    </Grid>
  );
};

export default Message;
