import axios from 'axios';
import { initDashboard } from '../Dashboard/actions';

export const ADD_NEW_GOAL = 'ADD_NEW_GOAL';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const LOAD_GOALS_START = 'LOAD_GOALS_START';
export const LOAD_GOALS_FINISH = 'LOAD_GOALS_FINISH';
export const CHANGE_GOAL = 'CHANGE_GOAL';
export const SAVE_CHANGES = 'SAVE_CHANGES';
export const DELETE_GOAL = 'DELETE_GOAL';
export const INIT_GOALS_LIST = 'INIT_GOALS_LIST';

export const addNewGoal = (data, isNoGoals, isNoGoalsFunc) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    let newGoalId =
      getState().goalsList.goals === null
        ? 0
        : getState().goalsList.goals.length;

    axios
      .put(
        `https://yourstepapp.firebaseio.com/users/${userId}/goals/${newGoalId}.json?auth=${token}`,
        data
      )
      .then(res => {
        dispatch({ type: ADD_NEW_GOAL, payload: data });

        if (isNoGoals) {
          dispatch(getGoals(0, isNoGoalsFunc));
        }
      })
      .catch(err => {
      });
  };
};

export const deleteGoal = (goalId, isNoGoalsFunc) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    dispatch({ type: DELETE_GOAL, payload: goalId });

    const updGoalsList = getState().goalsList.goals;
    axios
      .put(
        `https://yourstepapp.firebaseio.com/users/${userId}/goals.json?auth=${token}`,
        updGoalsList
      )
      .then(res => {
        dispatch(initDashboard(0));
      })
      .catch(err => {
      });

    if (updGoalsList.length === 0) {
      isNoGoalsFunc(true);
    }
  };
};

export const getGoals = (goalId, isNoGoalsFunc) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    dispatch({ type: LOAD_GOALS_START });

    axios
      .get(
        `https://yourstepapp.firebaseio.com/users/${userId}/goals.json?auth=${token}`
      )
      .then(res => {
        if (res.data !== null) {
          if (isNoGoalsFunc !== undefined) {
            isNoGoalsFunc(false);
            dispatch({ type: INIT_GOALS_LIST, payload: res.data });
            dispatch(initDashboard(goalId));
          } else {
            dispatch({
              type: UPDATE_GOAL,
              payload: { data: res.data[goalId], goalId }
            });
            dispatch(initDashboard(goalId));
          }
        }
        else {
          dispatch({ type: LOAD_GOALS_FINISH });
        }
      });
  };
};

export const saveChanges = (data, goalId) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    axios
      .patch(
        `https://yourstepapp.firebaseio.com/users/${userId}/goals/${goalId}.json?auth=${token}`,
        data
      )
      .then(res => {
        dispatch(getGoals(goalId));
      })
      .catch(err => {
      });
  };
};
