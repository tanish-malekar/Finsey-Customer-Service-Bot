import "./App.css";
import { ThemeProvider } from "styled-components";
import { appTheme } from "./themes/theme";
import LandingPage from "./pages/landing-page";
import { StoreProvider } from "./store";
import { BotStepperReducer, initialState } from "./reducer/BotStepperReducer";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <StoreProvider initialState={initialState} reducer={BotStepperReducer}>
        <LandingPage />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
