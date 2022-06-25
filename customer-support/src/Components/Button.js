import { Button, styled } from "@mui/material";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'status' && prop!=='size',
})(({ theme, status, size }) => ({
  borderRadius: "16px",
  backgroundColor: status==="danger"?"red":theme.palette.primary.main,
  width: size==="small"?"60%":"90%",
  margin: "auto",
  color: "white",
  padding: "10px 0",
  display: "block",
  "&:hover": {
    backgroundColor: status==="danger"?"darkred":theme.palette.primary.dark,
  },
}));

export default StyledButton;
