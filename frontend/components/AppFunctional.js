import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  //need slices of state for coordinates(x, y), count, email, submitMessage, directionMessage

  const URL = "http://localhost:9000/api/result";
  const [cordX, setCordX] = useState(2);
  const [cordY, setCordY] = useState(2);
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [directionMessage, setDirectionMessage] = useState("");

  const newPlayer = (newInfo) => {
    axios
      .post(URL, newInfo)
      .then((res) => {
        console.log(res.data);
        setSubmitMessage(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (evt) => {
    const newInfo = {
      x: cordX,
      y: cordY,
      steps: count,
      email: email,
    };
    newPlayer(newInfo);
    evt.preventDefault();
    setEmail('');
  };

  const reset = () => {
    setCordX(2);
    setCordY(2);
    setCount(0);
    setEmail("");
    setSubmitMessage("");
    setDirectionMessage("");
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({cordX}, {cordY})
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
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
        id="email" 
        type="email" 
        placeholder="type email"
        onChange={evt => setEmail(evt.target.value)}
        value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}

//I think I need to break this up in to different functions instead of so many else if statements

// onClick = (id) => {
//     if (id === "left") {
//       if (cordX > 1) {
//         this.setState({
//           ...this.state,
//           x: this.state.x - 1,
//           count: this.state.count + 1,
//         });
//       } else {
//         this.setState({
//           ...this.state,
//           directionMessage: "You can't go left",
//         });
//       }
//     } 
    
//     else if (id === "right") {
//       if (this.state.x < 3) {
//         this.setState({
//           ...this.state,
//           x: this.state.x + 1,
//           count: this.state.count + 1,
//         });
//       } else {
//         this.setState({
//           ...this.state,
//           directionMessage: "You can't go right",
//         });
//       }
//     } 
    
//     else if (id === "up") {
//       if (this.state.y > 1) {
//         this.setState({
//           ...this.state,
//           x: this.state.y - 1,
//           count: this.state.count + 1,
//         });
//       } else {
//         this.setState({
//           ...this.state,
//           directionMessage: "You can't go up",
//         });
//       }
//     } 
    
//     else if (id === "down") {
//       if (this.state.y < 3) {
//         this.setState({
//           ...this.state,
//           x: this.state.y + 1,
//           count: this.state.count + 1,
//         });
//       } else {
//         this.setState({
//           ...this.state,
//           directionMessage: "You can't go down",
//         });
//       }
//     }
