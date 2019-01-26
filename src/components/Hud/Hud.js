import React from "react";
import { ReactComponent as Human } from "../../images/human.svg";
import "./Hud.css";

const Hud = props => {
  return (
    <div className="hud">
      <div className="stats box">
        <div className="left">
          <div className="aug" />
          <p className="be">BE</p>
        </div>
        <div className="right">
          <Human className="humanSvg" />
        </div>
        <div className="weapon box">
          <p>Oruzje</p>
        </div>
      </div>
    </div>
  );
};

export default Hud;
