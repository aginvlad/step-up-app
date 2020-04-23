import * as actions from './actions';

const initialState = {
  title: '',
  steps: 0,
  stepsRange: 100,
  percentage: 0,
  type: 'space'
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_DASHBOARD:
      return {
        ...state,
        title: action.payload.title,
        steps: action.payload.steps,
        stepsRange: action.payload.stepsRange,
        percentage: action.payload.percentage,
        type: action.payload.type
      };
    case actions.ADD_STEP:
      let stepUp = state.steps;
      if (stepUp < state.stepsRange) stepUp++;
      return {
        ...state,
        steps: stepUp,
        percentage: +(stepUp * 100 / state.stepsRange).toFixed(2)
      };
    case actions.REMOVE_STEP:
      stepUp = state.steps;
      if (stepUp > 0) stepUp--;
      return {
        ...state,
        steps: stepUp,
        percentage: +(stepUp * 100 / state.stepsRange).toFixed(2)
      };
    case actions.RESET_STEPS:
      return {
        ...state,
        steps: 0,
        percentage: 0
      };
    default:
      return state;
  }
};

export default auth;
