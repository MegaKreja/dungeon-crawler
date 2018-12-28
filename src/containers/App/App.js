import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
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
      <div className="App">
        <h1>Hello</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    grid: state.grid.currentLevelGrid
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
