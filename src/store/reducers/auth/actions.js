import axios from 'axios';
export const AUTH_START = 'AUTH_START';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const GET_USER_SETTINGS = 'GET_USER_SETTINGS';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_SETTINGS_FAIL = 'CHANGE_SETTINGS_FAIL';
export const RESET_USER_SETTINGS_CHANGE_INFO =
  'RESET_USER_SETTINGS_CHANGE_INFO';

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    dispatch({ type: AUTH_SIGN_OUT });
  };
};

const getUserSettings = (userId, token) => {
  return dispatch => {
    axios
      .get(
        `https://yourstepapp.firebaseio.com/users/${userId}/settings.json?auth=${token}`
      )
      .then(res => {
        dispatch({
          type: GET_USER_SETTINGS,
          payload: {
            email: res.data.email,
            name: res.data.name,
            surname: res.data.surname
          }
        });
      })
      .catch(err => {});
  };
};

export const addUserInfoToDatabase = (data, userId, token) => {
  return dispatch => {
    /* Here we try to connect the DB after registration. If an error occurred we should delete the user from firebase user DB. To do this we should signIn user through the firebase method and after that delete him*/
    axios
      .put(
        `https://yourstepapp.firebaseio.com/users/${userId}/settings.json?auth=${token}`,
        { email: data.email, name: data.name, surname: data.surname }
      )
      .then(() => {
        dispatch(authSuccess(token, userId));
      })
      .then(() => dispatch(getUserSettings(userId, token)))
      .catch(err => {
        const data = {
          idToken: token
        };

        axios
          .post(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/deleteAccount?key=AIzaSyDslsxVjGDQwSGra5RCvRR4Xdf4xY6U_8Y',
            data
          )
          .catch();

        dispatch(authFail(err));
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate');
      });
  };
};

export const auth = (data, isSignIn) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    };

    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDslsxVjGDQwSGra5RCvRR4Xdf4xY6U_8Y';
    if (isSignIn)
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDslsxVjGDQwSGra5RCvRR4Xdf4xY6U_8Y';
    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
        if (!isSignIn)
          dispatch(
            addUserInfoToDatabase(data, res.data.localId, res.data.idToken)
          );
        else {
          dispatch(authSuccess(res.data.idToken, res.data.localId));
          dispatch(getUserSettings(res.data.localId, res.data.idToken));
        }
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(getUserSettings(userId, token));
        dispatch(checkTokenTimeOut(expirationDate - new Date()));
      } else {
        // Gen a brand new token
        const data = {
          grant_type: 'refresh_token',
          refresh_token: localStorage.getItem('refreshToken')
        };
        axios
          .post(
            `https://securetoken.googleapis.com/v1/token?key=AIzaSyDslsxVjGDQwSGra5RCvRR4Xdf4xY6U_8Y`,
            data
          )
          .then(res => {
            const userId = localStorage.getItem('userId');
            const expirationDate = new Date(
              new Date().getTime() + res.data.expires_in * 1000
            );
            localStorage.setItem('token', res.data.id_token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(res.data.id_token, userId));
            dispatch(getUserSettings(userId, res.data.id_token));
            dispatch(checkTokenTimeOut(expirationDate - new Date()));
          });
      }
    }
  };
};

export const checkTokenTimeOut = time => {
  return dispatch => {
    // We need to update token after its expiration, so we get the time when we should do it
    setTimeout(() => dispatch(authCheckState()), time);
  };
};

export const changeUserSettings = newUserSettings => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    axios
      .patch(
        `https://yourstepapp.firebaseio.com/users/${userId}/settings.json?auth=${token}`,
        { name: newUserSettings.name, surname: newUserSettings.surname }
      )
      .then(() => dispatch(getUserSettings(userId, token)))
      .catch(() =>
        dispatch({
          type: CHANGE_SETTINGS_FAIL,
          error: 'change_settings_error'
        })
      );

    if (newUserSettings.password) {
      const data = {
        idToken: token,
        password: newUserSettings.password,
        returnSecureToken: true
      };

      axios
        .post(
          `https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyDslsxVjGDQwSGra5RCvRR4Xdf4xY6U_8Y`,
          data
        )
        .then(res => {
          localStorage.setItem('refreshToken', res.data.refreshToken);
          setTimeout(() => dispatch(signOut()), 3000);
          dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            isPasswordChanged: true
          });
        })
        .catch(err => {
          dispatch({
            type: CHANGE_SETTINGS_FAIL,
            error: 'change_settings_error'
          });
        });
    }
  };
};

export default auth;
