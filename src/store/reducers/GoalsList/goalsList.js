import * as actions from './actions';

const initialState = {
  goals: [],
  selectedGoal: 1,
  isLoading: false
};

const goalsList = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_GOALS_START:
      return {
        ...state,
        isLoading: true
      };
    case actions.LOAD_GOALS_FINISH:
      return {
        ...state,
        isLoading: false
      };
    case actions.INIT_GOALS_LIST:
      return {
        ...state,
        goals: action.payload,
        isLoading: false
      };
    case actions.DELETE_GOAL:
      const newPart = state.goals.splice(0, action.payload);
      const newGoalList = [
        ...newPart,
        ...state.goals.splice(1, state.goals.length - 1)
      ];

      for (let i = action.payload; i < newGoalList.length; i++) {
        newGoalList[i].index = i;
      }
      return {
        ...state,
        goals: newGoalList
      };
    case actions.ADD_NEW_GOAL:
      if (state.goals !== null) {
        const newGoalsList = [...state.goals];
        newGoalsList.push(action.payload);
        return {
          ...state,
          goals: newGoalsList
        };
      } else {
        return {
          ...state
        };
      }
    case actions.UPDATE_GOAL:
      const updGoals = [...state.goals];
      updGoals[action.payload.goalId] = action.payload.data;
      return {
        ...state,
        goals: updGoals,
        isLoading: false
      };
    case actions.CHANGE_GOAL:
      const goalToChange = {
        title: action.payload.title,
        steps: action.payload.steps,
        stepsRange: action.payload.stepsRange,
        percentage: action.payload.percentage,
        type: action.payload.type
      };
      const copyGoalsList = [...state.goals];
      copyGoalsList[action.payload.index] = goalToChange;
      return {
        ...state,
        goals: copyGoalsList
      };
    default:
      return state;
  }
};

export default goalsList;
