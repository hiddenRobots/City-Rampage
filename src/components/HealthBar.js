import React, { Component } from 'react';
import { gameSettings } from '../initial-state';

class HealthBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayHealth: 0,
    };
  }

  // componentDidUpdate() {
  //   if (this.state.displayHealth < this.props.health) {
  //     setTimeout(() => this.setState({ displayHealth: this.state.displayHealth + 0.1 }), 20);
  //   } else if (this.state.displayHealth > this.props.health + 0.1) {
  //     setTimeout(() => this.setState({ displayHealth: this.state.displayHealth - 0.1 }), 20);
  //   }
  // }

  render() {
    const health = this.props.health;
    const maxHealth = gameSettings.maxHealth;
    const percentage = Math.floor((health / maxHealth) * 100);

    return (
      <div
        className="outer-bar" style={{
          width: '70%',
          border: 'solid',
          borderColor: 'black',
          borderRadius: '8px',
          borderWidth: '3px',

        }}
      >
        <div
          className="inner-bar" style={{
            width: `${percentage}%`,
            height: '8px',
            backgroundColor: 'red',
            borderRadius: '3px',
          }}
        />
      </div>
    );
  }

}


export default HealthBar;
