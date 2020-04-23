import React from 'react';
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import './Menu.sass';

const menu = props => {
  return (
    <nav className="menu">
      <div
        className="menu-burger"
        onClick={e =>
          document
            .querySelector('.menu-sidebar')
            .classList.add('menu-sidebar--active')
        }
      >
        <span className="menu-burger__part" />
      </div>
      <SimpleBar className="menu-sidebar">
        <div className="menu-sidebar__close-btn" onClick={props.closeSideBar}>
          <i className="fas fa-arrow-left" />
        </div>
        {props.goalsList !== null ? props.goalsList.map((el, i) => {
          return (
            <div
              className="menu-sidebar__el"
              key={`menu-element-${i}`}
              index={i}
              onClick={e => {
                const index = +e.currentTarget.getAttribute('index');
                props.closeSideBar();
                props.getSelectedGoalIndex(index);
                props.initDashboard(index);
              }}
            >
              <h3 className="menu-sidebar__el__title">{el.title}</h3>
            </div>
          );
        }) : null}
        <div className="menu-sidebar__add-btn" onClick={props.openModal}>
          <i className="fas fa-plus" />
        </div>
      </SimpleBar>
    </nav>
  );
};

export default menu;
