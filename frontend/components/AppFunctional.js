import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const URL = "http://localhost:9000/api/result";
  const [coord_X, setCoord_X] = useState(2);
  const [coord_Y, setCoord_Y] = useState(2);
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const newPlayer = (newInfo) => {
    axios
      .post(URL, newInfo)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => setMessage(err.response.data.message));
  };

  const onSubmit = (evt) => {
    const newInfo = {
      x: coord_X,
      y: coord_Y,
      steps: count,
      email: email,
    };
    newPlayer(newInfo);
    evt.preventDefault();
    setEmail("");
  };

  const reset = () => {
    setCoord_X(2);
    setCoord_Y(2);
    setCount(0);
    setEmail("");
    setMessage("");
  };

  const right = () => {
    if (coord_X < 3) {
      setCoord_X(coord_X + 1);
      setCount(count + 1);
      setMessage("");
    } else {
      setMessage("You can't go right");
    }
  };

  const left = () => {
    if (coord_X > 1) {
      setCoord_X(coord_X - 1);
      setCount(count + 1);
      setMessage("");
    } else {
      setMessage("You can't go left");
    }
  };

  const up = () => {
    if (coord_Y > 1) {
      setCoord_Y(coord_Y - 1);
      setCount(count + 1);
      setMessage("");
    } else {
      setMessage("You can't go up");
    }
  };

  const down = () => {
    if (coord_Y < 3) {
      setCoord_Y(coord_Y + 1);
      setCount(count + 1);
      setMessage("");
    } else {
      setMessage("You can't go down");
    }
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({coord_X}, {coord_Y})
        </h3>
        <h3 id="steps">{count === 1 ? `You moved ${count} time` : `You moved ${count} times`}</h3>
      </div>
      <div id="grid">
        <div
          className={coord_Y === 1 && coord_X === 1 ? "square active" : "square"}
        >
          {coord_Y === 1 && coord_X === 1 ? "B" : ""}
        </div>
        <div
          className={coord_Y === 1 && coord_X === 2 ? "square active" : "square"}
        >
          {coord_Y === 1 && coord_X === 2 ? "B" : ""}
        </div>
        <div
          className={coord_Y === 1 && coord_X === 3 ? "square active" : "square"}
        >
          {coord_Y === 1 && coord_X === 3 ? "B" : ""}
        </div>
        <div
          className={coord_Y === 2 && coord_X === 1 ? "square active" : "square"}
        >
          {coord_Y === 2 && coord_X === 1 ? "B" : ""}
        </div>
        <div
          className={coord_Y === 2 && coord_X === 2 ? "square active" : "square"}
        >
          {coord_Y === 2 && coord_X === 2 ? "B" : ""}
        </div>
        <div
          className={coord_Y === 2 && coord_X === 3 ? "square active" : "square"}
        >
          {coord_Y === 2 && coord_X === 3 ? "B" : ""}
        </div>
        <div
          className={coord_Y === 3 && coord_X === 1 ? "square active" : "square"}
        >
          {coord_Y === 3 && coord_X === 1 ? "B" : ""}
        </div>
        <div
          className={coord_Y === 3 && coord_X === 2 ? "square active" : "square"}
        >
          {coord_Y === 3 && coord_X === 2 ? "B" : ""}
        </div>
        <div
          className={coord_Y === 3 && coord_X === 3 ? "square active" : "square"}
        >
          {coord_Y === 3 && coord_X === 3 ? "B" : ""}
        </div>
      </div>
      <div className="info">
        <h3 id="message">
          {message}
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
