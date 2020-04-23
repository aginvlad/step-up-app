import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../../components/Menu/Menu';
import Profile from '../../components/Profile/Profile';
import Rocket from '../../components/Rocket/Rocket';
import AddItemModal from '../../components/AddItemModal/AddItemModal';
import AddGoalBtn from '../../components/AddGoalBtn/AddGoalBtn';
import Settings from '../../components/Settings/Settings';
import Spinner from '../../components/Spinner/Spinner';
import Backdrop from '../../components/Backdrop/Backdrop';
import { initDashboard } from '../../store/reducers/Dashboard/actions';
import {
  getGoals,
  addNewGoal,
  saveChanges,
  deleteGoal
} from '../../store/reducers/GoalsList/actions';
import {
  RESET_USER_SETTINGS_CHANGE_INFO,
  signOut,
  changeUserSettings
} from '../../store/reducers/auth/actions';
import {
  ADD_STEP,
  REMOVE_STEP,
  RESET_STEPS
} from '../../store/reducers/Dashboard/actions';

import tubeImage from '../../assets/Space/tube.png';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      controlPanelDefault: true,
      settingsModal: false,
      modal: false,
      screenWidth: window.innerWidth,
      selectedGoal: 0,
      isNoGoals: true
    };
  }
  componentDidMount() {
    this.props.getGoals(0, this.isNoGoalsHandler);
    window.addEventListener('resize', this.getScreenWidth);
    window.addEventListener('click', this.closeSideBarOnBlur);
    if (!this.state.isNoGoals) {
      if (this.props.type === 'walking') {
        this.walkingTypeHandler();
      } else if (this.props.type === 'space') {
        this.spaceTypeHandler();
      }
    }
  }
  componentDidUpdate() {
    if (!this.state.isNoGoals && !this.props.isLoading) {
      if (this.props.type === 'walking') {
        this.walkingTypeHandler();
      } else if (this.props.type === 'space') {
        this.spaceTypeHandler();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getScreenWidth);
    window.removeEventListener('click', this.closeSideBarOnBlur);
  }

  getScreenWidth = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  closeSideBarOnBlur = e => {
    if (
      e.target.className !== 'simplebar-content' &&
      e.target.className !== 'menu-burger' &&
      e.target.className !== 'menu-burger__part' &&
      e.target.className !== 'menu-sidebar__close-btn' &&
      e.target.className !== 'fas fa-sign-out-alt' &&
      e.target.className !== 'profile-btn profile-signout-btn'
    )
      this.closeSideBar();
  };

  isNoGoalsHandler = value => {
    this.setState({ isNoGoals: value });
  };

  walkingTypeHandler() {
    let percentage = this.props.percentage;

    document.body.style.backgroundColor = '#1e1f26';

    const completedRoad = document.querySelector(
      '.rocket-interface__flag-road__completed'
    );
    const completedLabel = document.querySelector(
      '.rocket-interface__flag-road__completed-label'
    );
    const human = document.querySelector('.rocket-interface__flag-road__human');
    const flag = document.querySelector('.rocket-interface__flag-road__flag');

    completedRoad.style.width = percentage + '%';

    if (percentage > 0) {
      human.style.left = `calc(${percentage}%)`;
    } else {
      human.style.left = `calc(${percentage}% - 3rem)`;
    }

    human.classList = 'fas fa-walking rocket-interface__flag-road__human';
    completedLabel.style.opacity = '0';
    completedLabel.style.visibilty = 'none';
    flag.style.opacity = '1';
    flag.style.visibilty = 'visible';
    flag.style.top = '-5rem';

    if (percentage > 85) {
      flag.style.opacity = '0';
      flag.style.visibilty = 'none';
      flag.style.top = '-15rem';
    }

    if (percentage === 100) {
      human.classList = 'fas fa-smile-wink rocket-interface__flag-road__human';
      completedLabel.style.opacity = '1';
      completedLabel.style.visibilty = 'visible';
    }
  }

  spaceTypeHandler() {
    let percentage = this.props.percentage;
    const PER_STEP = ((1 * 100) / this.props.stepsRange).toFixed(2);
    const BORDER = +(
      (Math.floor(66 / PER_STEP) * 100) /
      this.props.stepsRange
    ).toFixed(2);
    const tube = document.querySelector('.tube');
    const flame = document.querySelector('.rocket-interface__logo__flame');
    const planet = document.querySelector('.planet');

    document.body.style.backgroundColor = '#1e1f26';

    if (percentage === 0) {
      tube.style.transform = 'translateY(300px)';
      flame.style.display = 'none';
      planet.style.display = 'none';
      document
        .querySelector('.rocket-interface__logo')
        .classList.remove('rocket-interface__logo--fly');
    } else if (percentage * 3.33 < 10) {
      tube.style.background = `linear-gradient(to top, #a55eea ${percentage *
        3.33}%, #1e1f26 ${percentage * 3.33}%)`;
      tube.style.transform = 'translateY(260px)';
      planet.style.display = 'none';
    } else if (percentage * 3.33 < 110) {
      tube.style.background = ``;
      tube.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0) 20%, #a55eea 20%), url(${tubeImage})`;
      tube.style.transform = `translateY(${250 -
        0.9 * percentage * 3.33 * 2.5}px)`;
      planet.style.display = 'none';
    } else if (percentage < BORDER) {
      flame.style.display = 'none';
      planet.style.display = 'none';
      document.querySelector('.rocket-interface__logo').style.animation =
        'none';
      if (percentage >= 50) {
        document.querySelector(
          '.rocket-interface__logo'
        ).style.animation = `rocketVibrationTakeOff ${120 -
          (120 / 17) * (percentage - 50)}ms linear infinite`;
      }
      flame.style.display = 'none';
      planet.style.display = 'none';
      document
        .querySelector('.rocket-interface__logo')
        .classList.remove('rocket-interface__logo--fly');
    } else if (percentage === BORDER) {
      document.querySelector(
        '.rocket-interface__logo'
      ).style.animation = `none`;
      document
        .querySelector('.rocket-interface__logo')
        .classList.add('rocket-interface__logo--fly');
      flame.style.display = 'block';
      planet.style.display = 'none';
    } else if (percentage > BORDER && percentage < 100) {
      planet.style.display = 'block';
      if (this.state.screenWidth > 560) {
        planet.style.transform = `translateX(-50%) scale(${(4.2 / 34) *
          (percentage - 66)})`;
      } else {
        planet.style.transform = `translateX(-50%) scale(${(3.2 / 34) *
          (percentage - 66)})`;
      }
      flame.style.display = 'block';
      document.body.style.backgroundColor = '#1e1f26';
    } else {
      document.body.style.backgroundColor = 'orange';
      planet.style.display = 'none';
    }
  }

  switchControlPanelHandler = () => {
    this.state.controlPanelDefault
      ? this.setState({ controlPanelDefault: false })
      : this.setState({ controlPanelDefault: true });
  };

  getSelectedGoalIndexHandler = index => {
    this.setState({ selectedGoal: index });
  };

  saveChangesHandler = () => {
    const goalData = {
      title: this.props.goalTitle,
      steps: this.props.steps,
      stepsRange: this.props.stepsRange,
      percentage: this.props.percentage,
      type: this.props.type
    };

    this.props.saveChanges(goalData, this.state.selectedGoal);
  };

  openModalHandler = () => {
    this.closeSideBar();
    this.setState({ modal: true });
  };

  closeModalHandler = () => {
    this.setState({ modal: false });
  };

  submitModalHandler = e => {
    e.preventDefault();
    const title = document.getElementById('modal-goal-title').value;
    const initialSteps = document.getElementById('modal-initial-step');
    const steps = document.getElementById('modal-steps');

    if (steps.value[0] === '0' || +initialSteps.value > +steps.value) {
      initialSteps.classList.add('add-item-modal__input--error');
      steps.classList.add('add-item-modal__input--error');
      return;
    } else {
      this.resetModalInputsErrorHandler();
    }

    this.closeModalHandler();

    const goal = {
      index: this.props.goalsList === null ? 0 : this.props.goalsList.length,
      title,
      steps: +initialSteps.value,
      stepsRange: +steps.value,
      percentage: +((initialSteps.value * 100) / steps.value).toFixed(2),
      type: +steps.value > 99 ? 'space' : 'walking'
    };

    this.props.addNewGoal(goal, this.state.isNoGoals, this.isNoGoalsHandler);
  };

  resetModalInputsErrorHandler = () => {
    const initialSteps = document.getElementById('modal-initial-step');
    const steps = document.getElementById('modal-steps');

    initialSteps.classList.remove('add-item-modal__input--error');
    steps.classList.remove('add-item-modal__input--error');
  };

  openSettingsHandler = () => {
    this.setState({ settingsModal: true });
  };

  closeSettingsHandler = () => {
    this.setState({ settingsModal: false });
    this.props.clearUserSettingsChangeLog();
  };

  closeSideBar = () => {
    document
      .querySelector('.menu-sidebar')
      .classList.remove('menu-sidebar--active');
  };

  render() {
    const PER_STEP = +((1 * 100) / this.props.stepsRange).toFixed(2);
    const BORDER = +(
      (Math.floor(66 / PER_STEP) * 100) /
      this.props.stepsRange
    ).toFixed(2);
    let isReadyToTakeOff;

    if (this.props.percentage > 65) {
      isReadyToTakeOff = this.props.percentage === BORDER ? true : false;
    }

    let mainContent =
      this.state.isNoGoals === true ? (
        <AddGoalBtn openModal={this.openModalHandler} />
      ) : (
        <Rocket
          goalTitle={this.props.goalTitle}
          addStep={this.props.addStep}
          removeStep={this.props.removeStep}
          resetSteps={this.props.resetSteps}
          type={this.props.type}
          steps={this.props.steps}
          stepsRange={this.props.stepsRange}
          percentage={this.props.percentage}
          border={BORDER}
          screenWidth={this.state.screenWidth}
          isReadyToTakeOff={isReadyToTakeOff}
          switchControlPanel={this.switchControlPanelHandler}
          controlPanelDefault={this.state.controlPanelDefault}
          saveChanges={this.saveChangesHandler}
        />
      );

    if (this.props.isLoading) mainContent = <Spinner />;

    return (
      <div>
        <Menu
          goalsList={this.props.goalsList}
          openModal={this.openModalHandler}
          closeSideBar={this.closeSideBar}
          getSelectedGoalIndex={this.getSelectedGoalIndexHandler}
          initDashboard={this.props.initDashboard}
        />
        <Profile
          openSettings={this.openSettingsHandler}
          userSettings={this.props.userSettings}
          signOut={this.props.signOut}
        />
        {mainContent}
        {this.state.modal ? (
          <>
            <AddItemModal
              closeModal={this.closeModalHandler}
              submitModal={this.submitModalHandler}
              resetInputsError={this.resetModalInputsErrorHandler}
            />
            <Backdrop />
          </>
        ) : null}
        {this.state.settingsModal ? (
          <>
            <Settings
              initDashboard={this.props.initDashboard}
              goalsList={this.props.goalsList}
              isNoGoalsFunc={this.isNoGoalsHandler}
              changeGoal={this.props.saveChanges}
              deleteGoal={this.props.deleteGoal}
              closeSettings={this.closeSettingsHandler}
              userSettings={this.props.userSettings}
              changeUserSettings={this.props.changeUserSettings}
              changeSettingsError={this.props.changeSettingsError}
              isPasswordChanged={this.props.isPasswordChanged}
            />
            <Backdrop />
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    changeSettingsError: state.auth.error,
    isPasswordChanged: state.auth.isPasswordChanged,
    goalTitle: state.dashboard.title,
    goalsList: state.goalsList.goals,
    isLoading: state.goalsList.isLoading,
    type: state.dashboard.type,
    steps: state.dashboard.steps,
    stepsRange: state.dashboard.stepsRange,
    percentage: state.dashboard.percentage,
    userSettings: state.auth.settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initDashboard: index => dispatch(initDashboard(index)),
    addNewGoal: (goal, isNoGoals, isNoGoalsFunc) =>
      dispatch(addNewGoal(goal, isNoGoals, isNoGoalsFunc)),
    deleteGoal: (index, isNoGoalsFunc) =>
      dispatch(deleteGoal(index, isNoGoalsFunc)),
    saveChanges: (data, goalId) => dispatch(saveChanges(data, goalId)),
    addStep: () => dispatch({ type: ADD_STEP }),
    removeStep: () => dispatch({ type: REMOVE_STEP }),
    resetSteps: () => dispatch({ type: RESET_STEPS }),
    getGoals: (index, isNoGoalsFunc) =>
      dispatch(getGoals(index, isNoGoalsFunc)),
    changeUserSettings: userSettings =>
      dispatch(changeUserSettings(userSettings)),
    clearUserSettingsChangeLog: () =>
      dispatch({ type: RESET_USER_SETTINGS_CHANGE_INFO }),
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
