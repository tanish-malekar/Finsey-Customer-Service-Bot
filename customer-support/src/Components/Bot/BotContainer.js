import { Fade, Paper, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import { VOICE_WINDOW } from "../../constants";
import { useStore } from "../../store";

export const BotPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})(({ theme, fullWidth }) => ({
  borderRadius: "20px",
  width: fullWidth?"600px":"300px",
  maxHeight: "400px",
  margin: "auto",
  display: "grid",
  position: "fixed",
  right: "50px",
  overflow: "hidden",
  bottom: "120px",
}));

const BotContainer = ({ showBot, children }) => {
  const [botStepper,] = useStore();
  return (
    <Fade in={showBot}>
      <div>
        <Slide in={showBot} direction="up" timeout={{ exit: 700, enter: 100 }}>
          {
            <BotPaper 
            fullWidth={botStepper===VOICE_WINDOW}>
              {children}
            </BotPaper>
          }
        </Slide>
      </div>
    </Fade>
  );
};
export default BotContainer;
