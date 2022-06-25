import { Backdrop, Fade, Paper, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import { VOICE_WINDOW } from "../../constants";
import { toggleShowBot } from "../../reducer/BotStepperReducer";
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
  transition:"0.5s",
  "& > .MuiGrid-root":{
    gridColumn: "1 / 6"
  }
}));

const BotContainer = ({ children }) => {
  const [state,dispatch] = useStore();
  return (
    <Backdrop
        open={state.showBot}
        onClick={()=>{dispatch(toggleShowBot())}}
        invisible
    >
        <Fade in={state.showBot}>
        <div>
            <Slide in={state.showBot} direction="up" timeout={{ exit: 700, enter: 100 }}>
            {
                <BotPaper 
                onClick={(e)=>{e.stopPropagation()}}
                fullWidth={state.botStepper===VOICE_WINDOW}>
                {children}
                </BotPaper>
            }
            </Slide>
        </div>
        </Fade>
     </Backdrop>
  );
};
export default BotContainer;
