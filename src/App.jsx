import React, { Component } from 'react';
import Light from './Light'
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
      let attributes = el.attributes.attributes
      let state = el.state.attributes
      return (
        <Light
          key={index}
          id={attributes.id}
          name={attributes.name}
          on={state.on}
          brightness={state.bri}
          />
      )
    })
  }


  render() {
    return (
      <div className="App">
        {
          this.renderLights()
        }
      </div>
    );
  }
}

export default App;
