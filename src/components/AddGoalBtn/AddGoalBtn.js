import React from 'react';

import './AddGoalBtn.sass';

const addGoalBtn = props => {
  return (
    <button className="add-first-goal-btn" onClick={props.openModal}>
        Let's add a new goal
    </button>
  );
};

export default addGoalBtn;
