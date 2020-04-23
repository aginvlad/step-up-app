import React from 'react';

import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import './Rocket.sass';
import './Fuel.scss';
import './Flame.css';
import Gauge from '../Gauge/Gauge';

import rocketPicture from '../../assets/Space/MyRocket.svg';
import planet from '../../assets/Space/Planet.svg';

const rocket = props => {
  let controlPanel;
  if (props.controlPanelDefault) {
    controlPanel = (
      <>
        <button className="rocket-control__add-btn" onClick={props.addStep}>
          Make a step
        </button>
        <div style={{display: 'flex'}}>
          <button
            className="rocket-control__edit-btn"
            onClick={props.switchControlPanel}
          >
            Edit
          </button>
          <button
            className="rocket-control__save-btn"
            onClick={props.saveChanges}
          >
            Save
          </button>
        </div>
      </>
    );
  } else {
    controlPanel = (
      <>
        <i
          className="fas fa-arrow-left rocket-control__back-btn"
          onClick={props.switchControlPanel}
        />
        <button
          className="rocket-control__remove-btn"
          onClick={props.removeStep}
        >
          Remove one step
        </button>
        <button
          className="rocket-control__reset-btn"
          onClick={props.resetSteps}
        >
          reset
        </button>
      </>
    );
  }

  const walking = (
    <div className="rocket-interface__flag-road">
      <h3 className="rocket-interface__flag-road__completed-label">
        Completed
      </h3>
      <div className="rocket-interface__flag-road__completed" />
      <i className="fas fa-walking rocket-interface__flag-road__human" />
      <i className="fas fa-flag rocket-interface__flag-road__flag" />
    </div>
  );

  let sideComponent;

  if (props.percentage < 34) {
    sideComponent = (
      <div className="rocket-interface__fuel">
        <div className="tube--empty">
          <div className="tube">
            <div className="bubbles-top" />
            <div className="bubbles-top" />
            <div className="bubbles-top" />
            <div className="bubbles-top" />
            <div className="bubbles-top" />
          </div>
        </div>
      </div>
    );
  } else if (props.percentage <= props.border) {
    sideComponent = (
      <Gauge
        isReadyToTakeOff={props.isReadyToTakeOff}
        speed={+((100 / 32) * (props.percentage - 34) * 0.08).toFixed(2)}
      />
    );
  }
  let space = (
    <>
      {sideComponent}
      <div className="rocket-interface__logo">
        <img src={rocketPicture} alt="" />
        <div className="rocket-interface__logo__flame">
          <div className="rocket-interface__logo__flame__container">
            <div className="red flame" />
            <div className="orange flame" />
            <div className="yellow flame" />
            <div className="white flame" />
          </div>
        </div>
      </div>
    </>
  );

  if (props.screenWidth <= 560) {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScoll: 1
    };

    space = (
      <Slider {...settings}>
        <div className="rocket-interface__logo">
          <img src={rocketPicture} alt="" />
          <div className="rocket-interface__logo__flame">
            <div className="rocket-interface__logo__flame__container">
              <div className="red flame" />
              <div className="orange flame" />
              <div className="yellow flame" />
              <div className="white flame" />
            </div>
          </div>
        </div>
        {sideComponent}
      </Slider>
    );
  }

  if (props.percentage > props.border && props.percentage < 100)
    space = (
      <>
        <div className="rocket-interface__logo rocket-interface__logo--on-the-way">
          <img src={rocketPicture} alt="" />
          <div className="rocket-interface__logo__flame">
            <div className="rocket-interface__logo__flame__container">
              <div className="red flame" />
              <div className="orange flame" />
              <div className="yellow flame" />
              <div className="white flame" />
            </div>
          </div>
        </div>
      </>
    );
  else if (props.percentage === 100)
    space = (
      <>
        <div className="rocket-interface__logo rocket-interface__logo--completed">
          <img src={rocketPicture} alt="" />
          <h3 className="rocket-interface__flag-road__completed-label rocket-interface__logo__complete-label">
            Completed
          </h3>
          <hr />
          <h3 className="rocket-interface__flag-road__completed-label rocket-interface__logo__complete-sublable">
            Great Work!
          </h3>
          <img src={planet} className="planet-on-complete" alt="" />
        </div>
      </>
    );

  return (
    <>
      {props.type === 'space' ? (
        <div className="planet">
          <img src={planet} alt="" />
        </div>
      ) : null}
      <div className="rocket">
        <div className="rocket-interface">
          {props.type === 'space' ? space : walking}
        </div>
        <div className="rocket-statistics">
          <h1 className="rocket-statistics__label">{props.goalTitle}</h1>
          {props.percentage < 34 &&
          props.type === 'space' &&
          props.screenWidth > 560 ? (
            <h2 className="rocket-statistics__fuel-label">Fuel</h2>
          ) : null}
          <div className="rocket-statistics__steps">
            <div className="rocket-statistics__steps__amount">
              {props.steps} / {props.stepsRange}
            </div>
          </div>
        </div>
        <div className="rocket-control">{controlPanel}</div>
      </div>
    </>
  );
};

export default rocket;
