import React, { Component } from 'react';
import logo from './logo.svg';
import s from './App.css';
import axios from 'axios';
import classNames from 'classnames/bind'
const baseUrl = 'http://localhost:3000'

const cx = classNames.bind(s)

class App extends Component {

  state = {
    lights: []
  }

  handleClick = () => {
    axios.get(`${baseUrl}/lights/3/brighter?value=60`)
      .then((p) => {
        console.log('====================================');
        console.log("it did a thing");
        console.log('====================================');
      })
      .catch((err) => {
        console.log('====================================');
        console.log("err is:", err);
        console.log('====================================');
      })
  }


  componentWillMount() {
    axios.get(`${baseUrl}/lights`)
      .then((response) => {
        let {data} = response
        this.setState({lights: data})
        this.renderLights()
      })
      .catch((err) => {
        console.log('====================================');
        console.log("err is:", err);
        console.log('====================================');
      })
  }

  renderLights = () => {
    return this.state.lights.map((el, index) => {
      console.log(el.attributes.attributes.name)
      return (
        <div key={index}>
          <label className={cx({red: !el.state.attributes.on})}>{el.attributes.attributes.name}</label>
          <input type="checkbox"
              onClick={this.handleClick}
              value={el.attributes.attributes.id}
              />
        </div>
      )
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.renderLights()
        }
      </div>
    );
  }
}

export default App;
