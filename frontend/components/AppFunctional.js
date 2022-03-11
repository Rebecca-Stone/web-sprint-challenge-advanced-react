import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
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
    setEmail("");
  };

  const reset = () => {
    setCordX(2);
    setCordY(2);
    setCount(0);
    setEmail("");
    setSubmitMessage("");
    setDirectionMessage("");
  };

  const right = () => {
    if (cordX < 3) {
      setCordX(cordX + 1);
      setCount(count + 1);
      setDirectionMessage("");
    } else {
      setDirectionMessage("You can't go right");
    }
  };

  const left = () => {
    if (cordX > 1) {
      setCordX(cordX - 1);
      setCount(count + 1);
      setDirectionMessage("");
    } else {
      setDirectionMessage("You can't go left");
    }
  };

  const up = () => {
    if (cordY > 1) {
      setCordY(cordY - 1);
      setCount(count + 1);
      setDirectionMessage("");
    } else {
      setDirectionMessage("You can't go up");
    }
  };

  const down = () => {
    if (cordY < 3) {
      setCordY(cordY + 1);
      setCount(count + 1);
      setDirectionMessage("");
    } else {
      setDirectionMessage("You can't go down");
    }
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
        <button id="left" onClick={left}>
          LEFT
        </button>
        <button id="up" onClick={up}>
          UP
        </button>
        <button id="right" onClick={right}>
          RIGHT
        </button>
        <button id="down" onClick={down}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
