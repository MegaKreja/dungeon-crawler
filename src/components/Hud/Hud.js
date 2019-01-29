import React from "react";
import { ReactComponent as Human } from "../../images/human.svg";
import crowbar from "../../images/crowbar.png";
import pistol from "../../images/pistol.png";
import buckshot from "../../images/shotgun.png";
import assaultRifle from "../../images/assaultRifle.png";
import dragonSword from "../../images/dragonSword.png";
import "./Hud.css";

const Hud = props => {
  const grid = (
    <table className="grid">
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

  let weaponImg = <img src={crowbar} alt="" />;
  switch (props.weapon.name) {
    case "Crowbar":
      weaponImg = <img src={crowbar} alt="" />;
      break;
    case "Pistol":
      weaponImg = <img src={pistol} alt="" />;
      break;
    case "Buckshot":
      weaponImg = <img src={buckshot} alt="" />;
      break;

    case "Assault Rifle":
      weaponImg = <img src={assaultRifle} alt="" />;
      break;

    case "Dragon Tooth Sword":
      weaponImg = <img src={dragonSword} alt="" />;
      break;
    default:
      weaponImg = <img src="" alt="" />;
      break;
  }

  return (
    <div className="hud">
      <div className="stats box">
        <div className="left">
          <div className="aug" />
          <p className="be">BE</p>
        </div>
        <div className="right">
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
        {weaponImg}
        <p>
          {props.weapon.name} DMG({props.weapon.damage})
        </p>
      </div>
    </div>
  );
};

export default Hud;
