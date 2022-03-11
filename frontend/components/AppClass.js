import React from "react";
import axios from "axios";

const URL = "http://localhost:9000/api/result";

// let x = 2;
// let y = 2;
// let allSteps = 0;

const initialState = {
  x: 2,
  y: 2,

  count: 0,
  form: {
    email: "",
  },
  submitMessage: "",
  directionMessage: "",
};

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    // console.log("this is state when mounting", this.state);
  }

  componentDidUpdate() {
    // console.log("this is what state is now", this.state);
  }

  getMessage = () => {
    const newPlayer = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.count,
      email: this.state.form.email,
    };
    // console.log("this is the newPlayer", newPlayer);
    axios
      .post(URL, newPlayer)
      .then((res) => {
        // console.log("this is the posting res", res);
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
    this.getMessage();
  };

  changeInput = (key, value) => {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [key]: value },
    });
  };

  onChange = (evt) => {
    const { value, id } = evt.target;
    this.changeInput(id, value);
  };

  onClick = (id) => {
    if (id === "left") {
      if (this.state.x > 1) {
        this.setState({
          ...this.state,
          x: this.state.x - 1,
          count: this.state.count + 1,
        });
      } else {
        this.setState({
          ...this.state,
          directionMessage: "You can't go left",
        });
      }
    } else if (id === "right") {
      if (this.state.x < 3) {
        this.setState({
          ...this.state,
          x: this.state.x + 1,
          count: this.state.count + 1,
        });
      } else {
        this.setState({
          ...this.state,
          directionMessage: "You can't go right",
        });
      }
    } else if (id === "up") {
      if (this.state.y > 1) {
        this.setState({
          ...this.state,
          x: this.state.y - 1,
          count: this.state.count + 1 
        });
      } else {
        this.setState({
          ...this.state,
          directionMessage: "You can't go up",
        });
      }
    } else if (id === "down") {
      if (this.state.y < 3) {
        this.setState({
          ...this.state,
          x: this.state.y + 1,
          count: this.state.count + 1 
        });
      } else {
        this.setState({
          ...this.state,
          directionMessage: "You can't go down",
        });
      }
    }
    console.log("x:", this.state.x, "y:", this.state.y);
    console.log("steps:", this.state.count);
  };

  render() {
    const { x, y, count, submitMessage, directionMessage } = this.state;
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
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message">
            {submitMessage}
            {directionMessage}
          </h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.onClick("left")}>
            LEFT
          </button>
          <button id="up" onClick={() => this.onClick("up")}>
            UP
          </button>
          <button id="right" onClick={() => this.onClick("right")}>
            RIGHT
          </button>
          <button id="down" onClick={() => this.onClick("down")}>
            DOWN
          </button>
          <button id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

// (x, y)
// (1, 1)(2, 1)(3, 1)
// (1, 2)(2, 2)(3, 2)
// (1, 3)(2, 3)(3, 3);

// moving up --y
// moving down ++y
// moving right ++x
//moving left --x
