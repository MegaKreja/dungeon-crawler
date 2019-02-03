import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Grid from "../../components/Grid/Grid";
import Hud from "../../components/Hud/Hud";
import "./App.css";

class App extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.props.movePlayer);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.props.movePlayer);
  }

  render() {
    return (
      <div className="app">
        <div className="hud">
          <Hud
            health={this.props.playerHealth}
            exp={this.props.playerExp}
            lvl={this.props.playerLvl}
            weapon={this.props.weapon}
          />
        </div>
        <div className="dungeon">
          <Grid grid={this.props.grid} floor={this.props.floor} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    grid: state.grid.currentLevelGrid,
    playerHealth: state.grid.playerHealth,
    playerExp: state.grid.playerExp,
    playerLvl: state.grid.playerLvl,
    floor: state.grid.floor,
    weapon: state.grid.weapon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    movePlayer: keyCode => dispatch(actionCreators.movePlayer(keyCode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
