import { GET_STARTED, SET_STEPPER, TOGGLE_BOT, SET_MODE } from "../constants";

export const initialState = {
  mode:'chat',
  botStepper:GET_STARTED,
  showBot:false
};

export const setBotStepper = (step) => ({
  type: SET_STEPPER,
  payload: step,
});

export const setMode = (mode) => ({
  type: SET_MODE,
  payload: mode,
});

export const toggleShowBot = () => ({
  type: TOGGLE_BOT,
});

export const BotStepperReducer = (state = initialState, action) => {
  if (action.type === SET_STEPPER) {
    console.log({
      ...state,
      botStepper:action.payload
    })
    return{
      ...state,
      botStepper:action.payload
    }
  }
  else if(action.type === TOGGLE_BOT){
    return{
      ...state,
      showBot:!state.showBot
    }
  }
  else if(action.type === SET_MODE){
    return{
      ...state,
      mode:action.payload
    }
  }
   else {
    return state;
  }
};
