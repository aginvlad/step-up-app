import React from 'react';

const signUp = props => {
  const preventSpace = (e) => {
    if(e.key === ' ')
      e.preventDefault();
  };

  return (
    <>
      <form action="#" className="auth-form" onSubmit={e => e.preventDefault()}>
        <div className="auth-form-block">
          <i className="fas fa-envelope" />
          <input
            id="sign-up-email"
            className="auth-form-input"
            maxLength="254"
            type="email"
            required
            placeholder="E-mail"
            onFocus={props.iconOnFocus}
            onBlur={props.iconOnBlur}
            onKeyDown={preventSpace}
          />
        </div>
        <div className="auth-form-block">
          <i className="fas fa-pen" />
          <input
            id="sign-up-name"
            className="auth-form-input"
            minLength="2"
            maxLength="20"
            type="text"
            required
            placeholder="Name"
            onFocus={props.iconOnFocus}
            onBlur={props.iconOnBlur}
            onKeyDown={preventSpace}
          />
        </div>
        <div className="auth-form-block">
          <input
            id="sign-up-surname"
            className="auth-form-input"
            minLength="2"
            maxLength="20"
            type="text"
            placeholder="Surname"
            onKeyDown={preventSpace}
          />
        </div>
        <div className="auth-form-block">
          <i className="fas fa-lock" />
          <input
            id="sign-up-first-pass"
            className="auth-form-input"
            minLength="6"
            maxLength="32"
            type="password"
            required
            placeholder="Password"
            onFocus={props.iconOnFocus}
            onBlur={props.iconOnBlur}
            onChange={props.resetInputError}
            onKeyDown={preventSpace}
          />
        </div>
        <div className="auth-form-block">
          <input
            id="sign-up-second-pass"
            className="auth-form-input"
            minLength="6"
            maxLength="32"
            type="password"
            required
            placeholder="Repeat password"
            onChange={props.resetInputError}
            onKeyDown={preventSpace}
          />
        </div>
        <button
          onClick={props.formIsValid}
          onMouseMove={e => {
            const x = e.pageX - e.target.getBoundingClientRect().left;
            const y = e.pageY - e.target.getBoundingClientRect().top;
            e.target.style.setProperty('--x', `${x}px`);
            e.target.style.setProperty('--y', `${y}px`);
          }}
          className="auth-form-btn btn-grad-anim"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <button className="auth-switch" onClick={props.detectSignType}>
        Want to Sign In?
      </button>
      {props.errorMsg !== null ? <span className="auth-error-msg">Something went wrong :(</span> : null}
    </>
  );
};

export default signUp;
