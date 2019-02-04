import React from "react";
import uuidv1 from "uuid/v1";
import "./Grid.css";
import wall from "../../images/wall.png";
import floor from "../../images/floor.png";
import ladder from "../../images/ladder.png";
import knight from "../../images/knight.png";
import health from "../../images/health.png";
import knife from "../../images/knife.png";
import hammer from "../../images/hammer.png";
import axe from "../../images/axe.png";
import katana from "../../images/katana.png";
import goblin from "../../images/goblin.png";
import skeleton from "../../images/skeleton.png";
import orc from "../../images/orc.png";
import chort from "../../images/chort.png";
import bigDemon from "../../images/big-demon.png";

const Grid = props => {
  let backgroundImg = null;
  const weaponArr = [knife, hammer, axe, katana];
  const weapon = weaponArr[props.floor];

  const enemyArr = [goblin, skeleton, orc, chort];
  const enemy = enemyArr[props.floor];

  const game = props.grid.map(row => {
    return (
      <tr key={uuidv1()}>
        {row.map(val => {
          if (val === 0) {
            backgroundImg = floor;
          } else if (val === 1) {
            backgroundImg = knight;
          } else if (val === 2) {
            backgroundImg = wall;
          } else if (val === 3) {
            backgroundImg = health;
          } else if (val === 4) {
            backgroundImg = weapon;
          } else if (val === 5) {
            backgroundImg = enemy;
          } else if (val === 6) {
            backgroundImg = ladder;
          } else if (val === 7) {
            backgroundImg = bigDemon;
          }
          return (
            <td
              key={uuidv1()}
              style={{ backgroundImage: "url(" + backgroundImg + ")" }}
            />
          );
        })}
      </tr>
    );
  });

  return (
    <div className="grid">
      <table>
        <tbody>{game}</tbody>
      </table>
    </div>
  );
};

export default Grid;
