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
    const gameOverScreen = (
      <div className="gameOver">
        {this.props.playerHealth <= 0 ? (
          <h1>You are dead!</h1>
        ) : (
          <h1>You won, you defeated Beelzebub!</h1>
        )}
        <button onClick={() => this.props.newGame()}>Try Again?</button>
      </div>
    );
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
          {!this.props.gameOver ? (
            <Grid grid={this.props.grid} floor={this.props.floor} />
          ) : (
            gameOverScreen
          )}
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
    weapon: state.grid.weapon,
    gameOver: state.grid.gameOver
  };
};

const mapDispatchToProps = dispatch => {
  return {
    movePlayer: keyCode => dispatch(actionCreators.movePlayer(keyCode)),
    newGame: () => dispatch(actionCreators.newGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
