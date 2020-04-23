export const INIT_DASHBOARD = 'INIT_DASHBOARD';
export const ADD_STEP = 'ADD_STEP';
export const REMOVE_STEP = 'REMOVE_STEP';
export const RESET_STEPS = 'RESET_STEPS';

export const initDashboard = (index) => {
    return (dispatch, getState) => {
        const state = getState().goalsList;        
        const dataToInit = state.goals[index];
        
        dispatch({type: INIT_DASHBOARD, payload: dataToInit})
    };
};