import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignIn from '../../components/SignIn&SignUp/SignIn';
import SignUp from '../../components/SignIn&SignUp/SignUp';
import { auth, AUTH_START } from '../../store/reducers/auth/actions';

import './Authorization.sass';
import './btnGradientAnimation.css';
import logo from '../../assets/Logo/StepUpLogo.png';

class Authorization extends Component {
  constructor() {
    super();
    this.state = {
      signIn: true
    };
  }

  iconColorOnFocusHandler(e) {
    e.target.previousSibling.style.color = 'white';
  }

  iconColorOnBlurHandler(e) {
    const icon = e.target.previousSibling;
    e.target.value.length !== 0
      ? (icon.style.color = 'white')
      : (icon.style.color = '#95a5a6');
  }

  detectSignTypeHandler = () => {
    this.state.signIn === true
      ? this.setState({ signIn: false })
      : this.setState({ signIn: true });
      this.props.resetError();
  };

  isSignInValidHandler = e => {
    const email = document.getElementById('sign-in-email');
    const pass = document.getElementById('sign-in-pass');

    if (!email.validity.valid || !pass.validity.valid) { 
      if (email.value.length > 0) {
        email.classList.add('auth-form-input-error');
        pass.classList.add('auth-form-input-error');
      }
      return;
    } else {
      email.classList.remove('auth-form-input-error');
      pass.classList.remove('auth-form-input-error');
      const userData = {
        email: email.value,
        password: pass.value,
      };
  
      this.props.onAuth(userData, this.state.signIn);
    }
  };

  resetInputsSingInErrorHandler = () => {
    document
      .getElementById('sign-in-email')
      .classList.remove('auth-form-input-error');
    document
      .getElementById('sign-in-pass')
      .classList.remove('auth-form-input-error');
  };

  resetInputsSingUpErrorHandler = () => {
    document
      .getElementById('sign-up-first-pass')
      .classList.remove('auth-form-input-error');
    document
      .getElementById('sign-up-second-pass')
      .classList.remove('auth-form-input-error');
  };

  isSignUpValidHandler = e => {
    const firstPass = document.getElementById('sign-up-first-pass');
    const secondPass = document.getElementById('sign-up-second-pass');
    const email = document.getElementById('sign-up-email');
    const name = document.getElementById('sign-up-name');
    const surname = document.getElementById('sign-up-surname');

    if (firstPass.value !== secondPass.value) {
      firstPass.classList.add('auth-form-input-error');
      secondPass.classList.add('auth-form-input-error');
      return;
    } else {
      firstPass.classList.remove('auth-form-input-error');
      secondPass.classList.remove('auth-form-input-error');

      if (
        email.validity.valid &&
        name.validity.valid &&
        surname.validity.valid &&
        firstPass.validity.valid &&
        secondPass.validity.valid
      ) {
        const userData = {
          email: email.value,
          password: firstPass.value,
          name: name.value,
          surname: surname.value
        };
        this.props.onAuth(userData, this.state.signIn);
      }
    }
  };

  render() {
    return (
      <div className="auth">
        <div className="auth-logo">
          <div className="auth-logo-img">
            <img alt="" src={logo} />
          </div>
          <span className="auth-logo-author">by FeeN Project</span>
          <div className="auth-logo-label">Step Up</div>
        </div>
        {this.state.signIn === true ? (
          <SignIn
            formIsValid={this.isSignInValidHandler}
            detectSignType={this.detectSignTypeHandler}
            iconOnFocus={this.iconColorOnFocusHandler}
            iconOnBlur={this.iconColorOnBlurHandler}
            resetInputError={this.resetInputsSingInErrorHandler}
            errorMsg={this.props.authError}
          />
        ) : (
          <SignUp
            formIsValid={this.isSignUpValidHandler}
            detectSignType={this.detectSignTypeHandler}
            iconOnFocus={this.iconColorOnFocusHandler}
            iconOnBlur={this.iconColorOnBlurHandler}
            resetInputError={this.resetInputsSingUpErrorHandler}
            errorMsg={this.props.authError}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pass, isSignIn) => dispatch(auth(email, pass, isSignIn)),
    resetError: () => dispatch({type: AUTH_START})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorization);
