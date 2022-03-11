import React from "react";
import axios from "axios";

const URL = "http://localhost:9000/api/result";

const initialState = {
  x: 2,
  y: 2,
  count: 0,
  email: "",
  submitMessage: "",
  directionMessage: "",
};

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {}

  componentDidUpdate() {}

  postNewPlayer = () => {
    const newPlayer = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.count,
      email: this.state.email,
    };
    axios
      .post(URL, newPlayer)
      .then((res) => {
        this.setState({
          ...this.state,
          submitMessage: [...this.state.submitMessage, res.data.message],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    this.postNewPlayer();
    this.setState({
      email: "",
    });
  };

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  reset = () => {
    this.setState({
      ...this.state,
      x: 2,
      y: 2,
      count: 0,
      email: "",
      submitMessage: "",
      directionMessage: "",
    });
  };

  left = () => {
    if (this.state.x > 1) {
      this.setState({
        ...this.state,
        x: this.state.x - 1,
        count: this.state.count + 1,
        directionMessage: "",
      });
    } else {
      this.setState({
        ...this.state,
        directionMessage: "You can't go left",
      });
    }
  };

  right = () => {
    if (this.state.x < 3) {
      this.setState({
        ...this.state,
        x: this.state.x + 1,
        count: this.state.count + 1,
        directionMessage: "",
      });
    } else {
      this.setState({
        ...this.state,
        directionMessage: "You can't go right",
      });
    }
  };

  up = () => {
    if (this.state.y > 1) {
      this.setState({
        ...this.state,
        y: this.state.y - 1,
        count: this.state.count + 1,
        directionMessage: "",
      });
    } else {
      this.setState({
        ...this.state,
        directionMessage: "You can't go up",
      });
    }
  };

  down = () => {
    if (this.state.y < 3) {
      this.setState({
        ...this.state,
        y: this.state.y + 1,
        count: this.state.count + 1,
      });
    } else {
      this.setState({
        ...this.state,
        directionMessage: "You can't go down",
      });
    }
  };

  render() {
    const { x, y, count, email, submitMessage, directionMessage } = this.state;
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({x}, {y})
          </h3>
          <h3 id="steps">You moved {count} times</h3>
        </div>
        <div id="grid">
          <div className={y === 1 && x === 1 ? "square active" : "square"}>
            {y === 1 && x === 1 ? "B" : ""}
          </div>
          <div className={y === 1 && x === 2 ? "square active" : "square"}>
            {y === 1 && x === 2 ? "B" : ""}
          </div>
          <div className={y === 1 && x === 3 ? "square active" : "square"}>
            {y === 1 && x === 3 ? "B" : ""}
          </div>
          <div className={y === 2 && x === 1 ? "square active" : "square"}>
            {y === 2 && x === 1 ? "B" : ""}
          </div>
          <div className={y === 2 && x === 2 ? "square active" : "square"}>
            {y === 2 && x === 2 ? "B" : ""}
          </div>
          <div className={y === 2 && x === 3 ? "square active" : "square"}>
            {y === 2 && x === 3 ? "B" : ""}
          </div>
          <div className={y === 3 && x === 1 ? "square active" : "square"}>
            {y === 3 && x === 1 ? "B" : ""}
          </div>
          <div className={y === 3 && x === 2 ? "square active" : "square"}>
            {y === 3 && x === 2 ? "B" : ""}
          </div>
          <div className={y === 3 && x === 3 ? "square active" : "square"}>
            {y === 3 && x === 3 ? "B" : ""}
          </div>
        </div>
        <div className="info">
          <h3 id="message">
            {submitMessage}
            {directionMessage}
          </h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.left}>
            LEFT
          </button>
          <button id="up" onClick={this.up}>
            UP
          </button>
          <button id="right" onClick={this.right}>
            RIGHT
          </button>
          <button id="down" onClick={this.down}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            id="email"
            type="email"
            placeholder="type email"
            value={email}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
