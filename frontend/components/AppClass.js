import React from "react";
import axios from 'axios'

const URL = 'http://localhost:9000/api/result';

const initialState = {
  coordinates: {
    "x": 2, 
    "y": 2,
  },
  "steps": 3, 
  form: {
    "email": ''
  }, 
  submitMessage: '',
  directionMessage: '',
}

export default class AppClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount(){
    console.log('this is state when mounting', this.state);
  }

  getMessage = () => {
    const newPlayer = {
      "x": this.state.coordinates["x"],
      "y": this.state.coordinates["y"],
      "steps": this.state["steps"],
      "email": this.state.form["email"]
    }
    console.log('this is the newPlayer',newPlayer)
    axios.post(URL, newPlayer)
     .then(res => {
       console.log('this is the posting res', res)
      this.setState({
        ...this.state, 
        submitMessage: [...this.state.submitMessage, res.data.message]
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  onSubmit = evt => {
    evt.preventDefault()
    this.getMessage()
  }

  changeInput = (key, value) => {
    this.setState({
      ...this.state,
      form: {...this.state.form, [key]: value } 
    })
  }

  onChange = evt => {
    const { value, id } = evt.target
    this.changeInput(id, value);
  }

  render() {
    const { coordinates, steps, submitMessage, directionMessage } = this.state;
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({coordinates["x"]}, {coordinates["y"]})</h3>
          <h3 id="steps">You moved {steps} times</h3>
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
          <h3 id="message">{submitMessage}{directionMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit" ></input>
        </form>
      </div>
    );
  }
}

// (1, 1)(2, 1)(3, 1)
// (1, 2)(2, 2)(3, 2)
// (1, 3)(2, 3)(3, 3);
