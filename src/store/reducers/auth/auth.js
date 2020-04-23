import * as actions from './actions';

const initialState = {
  token: null,
  userId: null,
  error: null,
  isPasswordChanged: null,
  loading: false,
  settings: {
    email: '',
    name: '',
    surname: ''
  }
  //isSignedIn: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      };
    case actions.GET_USER_SETTINGS:
      return {
        ...state,
        settings: {
          email: action.payload.email,
          name: action.payload.name,
          surname: action.payload.surname,
        }
      }
    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordChanged: true
      }
    case actions.CHANGE_SETTINGS_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actions.RESET_USER_SETTINGS_CHANGE_INFO:
      return {
        ...state,
        error: null,
        isPasswordChanged: null
      }
    case actions.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actions.AUTH_SIGN_OUT:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        loading: false
      };
    default:
      return state;
  }
};

export default auth;
