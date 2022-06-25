import { GET_STARTED, SET_STEPPER, TOGGLE_BOT } from "../constants";

export const initialState = {
  botStepper:GET_STARTED,
  showBot:false
};

export const setBotStepper = (step) => ({
  type: SET_STEPPER,
  payload: step,
});

export const toggleShowBot = () => ({
  type: TOGGLE_BOT,
});

export const BotStepperReducer = (state = initialState, action) => {
  if (action.type === SET_STEPPER) {
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
   else {
    return state;
  }
};
