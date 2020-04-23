import React, { Component } from 'react';

import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import './Settings.sass';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      settingsType: 'none',
      showDeleteConfirmation: false,
      selectedGoal: null
    };
  }

  onSubmitProfileSettingsHandler = e => {
    e.preventDefault();
    const name = document.getElementById('settings-name');
    const surname = document.getElementById('settings-surname');
    const firstPass = document.getElementById('settings-new-pass-1');
    const secondPass = document.getElementById('settings-new-pass-2');

    if (
      name.value.length === 0 &&
      surname.value.length === 0 &&
      firstPass.value.length === 0 &&
      secondPass.value.length === 0
    ) {
      return;
    } else {
      if (firstPass.value !== secondPass.value) {
        firstPass.classList.add('settings-input--error');
        secondPass.classList.add('settings-input--error');
        return;
      } else {
        firstPass.classList.remove('settings-input--error');
        secondPass.classList.remove('settings-input--error');
      }
    }

    const userSettings = {
      name: name.value.length === 0 ? name.placeholder : name.value,
      surname: surname.value.length === 0 ? surname.placeholder : surname.value,
      password: firstPass.value.length === 0 ? null : firstPass.value
    };

    this.props.changeUserSettings(userSettings);
  };

  onSubmitGoalSettingsHandler = e => {
    e.preventDefault();

    const goalTitle = document.getElementById('settings-goal-title');
    const initialSteps = document.getElementById('settings-goal-initial-step');
    const steps = document.getElementById('settings-goal-steps');

    if (
      (initialSteps.value.length !== 0 &&
        steps.value.length === 0 &&
        +initialSteps.value > +steps.placeholder) ||
      (initialSteps.value.length === 0 &&
        steps.value.length !== 0 &&
        +steps.value < +initialSteps.placeholder)
    ) {
      initialSteps.classList.add('settings-input--error');
      steps.classList.add('settings-input--error');
      return;
    } else if (
      initialSteps.value.length !== 0 &&
      steps.value.length !== 0 &&
      +initialSteps.value > +steps.value
    ) {
      initialSteps.classList.add('settings-input--error');
      steps.classList.add('settings-input--error');
      return;
    } else {
      initialSteps.classList.remove('settings-input--error');
      steps.classList.remove('settings-input--error');
    }

    const goal = {
      index: this.state.selectedGoal,
      title:
        goalTitle.value.length === 0 ? goalTitle.placeholder : goalTitle.value,
      steps:
        initialSteps.value.length === 0
          ? +initialSteps.placeholder
          : +initialSteps.value,
      stepsRange: steps.value.length === 0 ? +steps.placeholder : +steps.value
    };

    goal.percentage = +((goal.steps * 100) / goal.stepsRange).toFixed(2);

    goal.type = goal.stepsRange > 99 ? 'space' : 'walking';

    this.props.changeGoal(goal, this.state.selectedGoal);
    this.props.initDashboard(this.state.selectedGoal);
  };

  openGoalSettingHandler = e => {
    this.setState({
      settingsType: 'goal',
      selectedGoal: +e.target.getAttribute('index')
    });
  };

  showProfileSettingsHandler = () => {
    this.setState({ settingsType: 'profile' });
  };

  showGoalsSettingsHandler = () => {
    this.setState({ settingsType: 'goals' });
  };

  resetInputsProfileSettingsErrorHandler() {
    const firstPass = document.getElementById('settings-new-pass-1');
    const secondPass = document.getElementById('settings-new-pass-2');

    firstPass.classList.remove('settings-input--error');
    secondPass.classList.remove('settings-input--error');

    if (firstPass.value.length !== 0 || secondPass.value.length !== 0) {
      firstPass.setAttribute('required', null);
      secondPass.setAttribute('required', null);
    } else {
      firstPass.removeAttribute('required');
      secondPass.removeAttribute('required');
    }
  }

  resetInputsGoalSettingsErrorHandler() {
    const initialSteps = document.getElementById('settings-goal-initial-step');
    const steps = document.getElementById('settings-goal-steps');

    initialSteps.classList.remove('settings-input--error');
    steps.classList.remove('settings-input--error');
  }

  showDeleteConfirmationHandler = () => {
    this.state.showDeleteConfirmation === false
      ? this.setState({ showDeleteConfirmation: true })
      : this.setState({ showDeleteConfirmation: false });
  };

  render() {
    let section;

    if (this.state.settingsType === 'none') {
      section = (
        <div className="settings__sections">
          <button
            className="settings__sections__btn settings__sections__btn--profile"
            onClick={this.showProfileSettingsHandler}
          >
            Profile Settings
          </button>
          <button
            className="settings__sections__btn settings__sections__btn--goals"
            onClick={this.showGoalsSettingsHandler}
          >
            Goals Settings
          </button>
        </div>
      );
    } else if (this.state.settingsType === 'profile') {
      section = (
        <div className="settings__profile-section">
          <form action="#" className="settings__profile-section__form">
            <div className="settings__profile-section__form__name-block">
              <input
                id="settings-name"
                className="settings-input"
                minLength="2"
                maxLength="20"
                type="text"
                placeholder={this.props.userSettings.name}
              />
              <input
                id="settings-surname"
                className="settings-input"
                minLength="2"
                maxLength="20"
                type="text"
                placeholder={this.props.userSettings.surname}
              />
            </div>
            <input
              id="settings-new-pass-1"
              className="settings-input"
              minLength="6"
              maxLength="32"
              type="password"
              placeholder="New Password"
              onChange={this.resetInputsProfileSettingsErrorHandler}
            />
            <input
              id="settings-new-pass-2"
              className="settings-input"
              minLength="6"
              maxLength="32"
              type="password"
              placeholder="Repeat New Password"
              onChange={this.resetInputsProfileSettingsErrorHandler}
            />
            <button
              className="settings-btn"
              onClick={this.onSubmitProfileSettingsHandler}
            >
              Save changes
            </button>
            {this.props.changeSettingsError === 'change_settings_error' ? (
              <span className="submit-error">Error occured, try to sign in again</span>
            ) : null}
            {this.props.isPasswordChanged ? <span className="submit-success">Password has been changed. You will be signed out in a second.</span> : null}
          </form>
        </div>
      );
    } else if (this.state.settingsType === 'goals') {
      section = (
        <SimpleBar className="settings__goals-section__sidebar">
          <div className="settings__goals-section__sidebar__container">
            {this.props.goalsList !== null
              ? this.props.goalsList.map((el, i) => {
                  return (
                    <div
                      className="settings__goals-section__sidebar__container__goal"
                      onClick={this.openGoalSettingHandler}
                      key={`settings-goal-${i}`}
                      index={i}
                    >
                      {el.title}
                    </div>
                  );
                })
              : null}
          </div>
        </SimpleBar>
      );
    } else {
      section = (
        <div className="settings__profile-section">
          <i
            className="fas fa-arrow-left rocket-control__back-btn settings-goal__back-btn"
            onClick={this.showGoalsSettingsHandler}
          />
          <form action="#" className="settings__profile-section__form">
            <input
              id="settings-goal-title"
              className="settings-input"
              minLength="1"
              maxLength="20"
              type="text"
              placeholder={this.props.goalsList[this.state.selectedGoal].title}
            />
            <input
              className="settings-input"
              id="settings-goal-initial-step"
              type="number"
              min="1"
              max="9998"
              maxLength="4"
              placeholder={this.props.goalsList[this.state.selectedGoal].steps}
              onKeyDown={e => {
                if (e.target.value.length > 0 && e.target.value === '0')
                  if (e.keyCode !== 8) e.preventDefault();
                if (['+', '-', '.', 'e'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={e => {
                this.resetInputsGoalSettingsErrorHandler();
                return e.target.value.length > 4
                  ? (e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    ))
                  : null;
              }}
            />
            <input
              className="settings-input"
              id="settings-goal-steps"
              type="number"
              min="1"
              max="9998"
              maxLength="4"
              placeholder={
                this.props.goalsList[this.state.selectedGoal].stepsRange
              }
              onKeyDown={e => {
                if (e.target.value.length === 0)
                  if (e.key === '0') e.preventDefault();
                if (['+', '-', '.', 'e'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={e => {
                this.resetInputsGoalSettingsErrorHandler();
                return e.target.value.length > 4
                  ? (e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    ))
                  : null;
              }}
            />
            {this.state.showDeleteConfirmation === true ? (
              <div className="settings__accept-to-delete">
                <h3 className="settings__accept-to-delete__title">
                  Are you sure?
                </h3>
                <button
                  className="settings-btn settings-btn-delete-goal"
                  onClick={e => {
                    e.preventDefault();
                    this.props.deleteGoal(
                      this.state.selectedGoal,
                      this.props.isNoGoalsFunc
                    );
                    this.setState({
                      settingsType: 'goals',
                      showDeleteConfirmation: false
                    });
                  }}
                >
                  Yes
                </button>
                <button
                  className="settings-btn"
                  onClick={this.showDeleteConfirmationHandler}
                >
                  No
                </button>
              </div>
            ) : (
              <>
                <button
                  className="settings-btn"
                  onClick={this.onSubmitGoalSettingsHandler}
                >
                  Save changes
                </button>
                <button
                  className="settings-btn settings-btn-delete-goal"
                  onClick={this.showDeleteConfirmationHandler}
                >
                  <i className="fas fa-trash" />
                  Delete
                </button>
              </>
            )}
          </form>
        </div>
      );
    }

    return (
      <div className="settings">
        <h2 className="settings__title">Settings</h2>
        <div className="settings__close-btn" onClick={this.props.closeSettings}>
          <span />
          <span />
        </div>
        {section}
      </div>
    );
  }
}

export default Settings;
