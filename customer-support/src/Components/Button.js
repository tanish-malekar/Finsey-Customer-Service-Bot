import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  backgroundColor: theme.palette.primary.main,
  width: "90%",
  margin: "auto",
  color: "white",
  padding: "10px 0",
  display: "block",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default StyledButton;
