import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(48, 111, 181, 1)",
      dark: "#006cb5",
    },
    secondary: blue,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.MuiPaper-root": {
            borderRadius: "20px",
          },
        },
        elevation: {
          borderRadius: "20px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
});
