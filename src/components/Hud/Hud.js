import React from "react";
import { ReactComponent as Human } from "../../images/human.svg";
import fist from "../../images/hud_fist.png";
import knife from "../../images/hud_knife.png";
import hammer from "../../images/hud_hammer.png";
import axe from "../../images/hud_axe.png";
import katana from "../../images/hud_katana.png";
import "./Hud.css";

const Hud = props => {
  const grid = (
    <table className="playerGrid">
      <tbody>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
      </tbody>
    </table>
  );

  let healthColor = "#00ff01";
  if (props.health < 20) {
    healthColor = "#E69A6D";
  } else if (props.health < 65) {
    healthColor = "#E0E163";
  } else {
    healthColor = "#00ff01";
  }

  let weaponImg = <img src={fist} alt="" />;
  switch (props.weapon.name) {
    case "Knife":
      weaponImg = <img src={knife} alt="" />;
      break;
    case "Hammer":
      weaponImg = <img src={hammer} alt="" />;
      break;
    case "Axe":
      weaponImg = <img src={axe} alt="" />;
      break;

    case "Katana":
      weaponImg = <img src={katana} alt="" />;
      break;
    default:
      weaponImg = <img src={fist} alt="" />;
      break;
  }

  return (
    <div className="hud">
      <div className="stats box">
        <div className="healthDiagram">
          {grid}
          <Human style={{ fill: healthColor }} className="humanSvg" />
        </div>
        <div className="playerInfo">
          <p>{props.health}HP</p>
          <p>{props.exp}EXP</p>
          <p>LVL {props.lvl}</p>
        </div>
      </div>
      <div className="weapon box">
        {weaponImg ? weaponImg : "loading"}
        <p>
          {props.weapon.name} DMG({props.weapon.damage})
        </p>
      </div>
    </div>
  );
};

export default Hud;
