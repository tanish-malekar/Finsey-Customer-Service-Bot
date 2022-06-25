import { GET_STARTED, SET_STEPPER, TOGGLE_BOT, SET_MODE, SET_LANGUAGE } from "../constants";

export const initialState = {
  mode:'genaral-queries',
  botStepper:GET_STARTED,
  showBot:false,
  language:"hi-IN"
};

export const setBotStepper = (step) => ({
  type: SET_STEPPER,
  payload: step,
});
export const setLanguage = (lang) => ({
  type: SET_LANGUAGE,
  payload: lang,
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
  else if(action.type === SET_LANGUAGE){
    return{
      ...state,
      languageS:action.payload
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
