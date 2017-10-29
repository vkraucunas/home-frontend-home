import React, { Component } from 'react';
import s from './Light.css'
import axios from 'axios';
import classNames from 'classnames/bind'
const baseUrl = 'http://localhost:3000'

const cx = classNames.bind(s)

class Light extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: props.id,
      on: props.on,
      brightness: props.brightness
    }
  }

  handleBrighterClick = () => {
    let {id} = this.state
    axios.get(`${baseUrl}/lights/${id}/brighter?value=60`)
      .then((p) => {
        this.setState({on: true, brightness: p.data.state.attributes.bri})
      })
      .catch((err) => {
        console.log('====================================');
        console.log("err is:", err);
      })
  }

  handleDarkerClick = () => {
    let {id} = this.state
    axios.get(`${baseUrl}/lights/${id}/dimmer?value=60`)
      .then((p) => {
        let brightness = p.data.state.attributes.bri
        if (brightness > 0) {
          this.setState({brightness: brightness})
        } else {
          this.setState({brightness: brightness, on: false})
        }
      })
      .catch((err) => {
        console.log('====================================');
        console.log("err is:", err);
      })
  }

  handlePowerClick = () => {
    let {id, on} = this.state
    let onOrOff = on ? 'off' : 'on'
    axios.get(`${baseUrl}/lights/${id}/${onOrOff}`)
      .then((p) => {
        this.setState({on: !this.state.on, brightness: p.data.state.attributes.bri})
      })
      .catch((err) => {
        console.log('====================================');
        console.log("err is:", err);
      })
  }
  render() {
    let { name } = this.props
    let { on, brightness, } = this.state
    return (
      <div className="light">
        <button
          onClick={this.handlePowerClick}
        >
          Power
        </button>
        <label className={cx({red: !on})}>{name} - {brightness}</label>
        <div>
          <button
            onClick={this.handleBrighterClick}
          >
            Up
          </button>
          <button
            onClick={this.handleDarkerClick}
          >
            Down
          </button>
          </div>
      </div>
    );
  }
}

export default Light;
