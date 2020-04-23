import React from 'react';

const signIn = props => {

  return (
    <>
      <form action="#" className="auth-form" onSubmit={e => e.preventDefault()}>
        <div className="auth-form-block">
          <i className="fas fa-user" />
          <input
            id="sign-in-email"
            className="auth-form-input"
            minLength="6"
            maxLength="254"
            type="email"
            required
            placeholder="E-mail"
            onFocus={props.iconOnFocus}
            onBlur={props.iconOnBlur}
            onChange={props.resetInputError}
            onKeyDown={(e) => {
              if(e.key === ' ')
                e.preventDefault();
            }}
          />
        </div>
        <div className="auth-form-block">
          <i className="fas fa-lock" />
          <input
            id="sign-in-pass"
            className="auth-form-input"
            minLength="6"
            maxLength="32"
            type="password"
            required
            placeholder="Password"
            onFocus={props.iconOnFocus}
            onBlur={props.iconOnBlur}
            onChange={props.resetInputError}
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
          Sign In
        </button>
      </form>
      <button className="auth-switch" onClick={props.detectSignType}>
        Want to Sign Up?
      </button>
      {props.errorMsg !== null ? <span className="auth-error-msg">Wrong email or password</span> : null}
    </>
  );
};

export default signIn;
