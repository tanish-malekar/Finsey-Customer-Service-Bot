import { GET_STARTED, SET_STEPPER } from "../constants";

export const initialState = GET_STARTED;

export const setBotStepper = (step) => ({
  type: SET_STEPPER,
  payload: step,
});

export const BotStepperReducer = (state = initialState, action) => {
  if (action.type === SET_STEPPER) {
    return action.payload;
  } else {
    return state;
  }
};
