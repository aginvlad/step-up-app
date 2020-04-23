import React from 'react';

import './Gauge.css';

const gauge = props => {
  let progressGauge =
    props.isReadyToTakeOff ? (
      <div className="drive-circulate--completed" />
    ) : (
      <div className="drive-circulate">
        <div className="gauge" />
        <div className="cover" />
        <div className="gauge-circle" />
        <div className="gauge-circle-border" />
      </div>
    );
  return (
    <div className="gauge-container">
      <div className="drive">
        {progressGauge}
        <p>current</p>
        <div className="count">{props.speed} km/s</div>
        <p className="btm">speed</p>
      </div>
    </div>
  );
};

export default gauge;
