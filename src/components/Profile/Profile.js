import React from 'react';

import './Profile.sass';
import settingsLogo from '../../assets/settings.png';

const profile = props => {
  return (
    <div className="profile">
      <div className="wrapper profile-photo">
        <img
          src={settingsLogo}
          alt=""
        />
      </div>
      <div className="profile-user">
        <div className="profile-user-name">
          {`${props.userSettings.name} ${props.userSettings.surname}`}
        </div>
        <div>
          <button className="profile-btn profile-user-btn" onClick={props.openSettings}>
            Settings
          </button>
          <button className="profile-btn profile-signout-btn" onClick={props.signOut}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default profile;
