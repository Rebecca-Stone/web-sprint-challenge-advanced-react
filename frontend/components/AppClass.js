import React from "react";
import axios from "axios";

const URL = "http://localhost:9000/api/result";

const initialState = {
  x: 2,
  y: 2,
  count: 0,
  email: "",
  message: "",
};

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

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
          message: [...this.state.message, res.data.message,
          ],
          
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          message: err.response.data.message
        })
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
      message: "",
    });
  };

  left = () => {
    if (this.state.x > 1) {
      this.setState({
        ...this.state,
        x: this.state.x - 1,
        count: this.state.count + 1,
        message: "",
      });
    } else {
      this.setState({
        ...this.state,
        message: "You can't go left",
      });
    }
  };

  right = () => {
    if (this.state.x < 3) {
      this.setState({
        ...this.state,
        x: this.state.x + 1,
        count: this.state.count + 1,
      });
    } else {
      this.setState({
        ...this.state,
        message: "You can't go right",
      });
    }
  };

  up = () => {
    if (this.state.y > 1) {
      this.setState({
        ...this.state,
        y: this.state.y - 1,
        count: this.state.count + 1,
        message: "",
      });
    } else {
      this.setState({
        ...this.state,
        message: "You can't go up",
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
        message: "You can't go down",
      });
    }
  };

  render() {
    const { x, y, count, email, message } = this.state;
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({x}, {y})
          </h3>
          <h3 id="steps">{count === 1 ? `You moved ${count} time` : `You moved ${count} times`}</h3>
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
            {message}
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
