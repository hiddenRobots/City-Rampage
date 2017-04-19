import React, { Component } from 'react';

class HealthBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      displayHealth: 0
    }
  }

  componentDidUpdate(){
    if (this.state.displayHealth < this.props.health){
      setTimeout(()=>this.setState({ displayHealth: this.state.displayHealth+.1 }),20)
    } else if (this.state.displayHealth > this.props.health+.1) {
      setTimeout(()=>this.setState({ displayHealth: this.state.displayHealth-.1 }),20)
    }
  }

  render() {
    let health = Math.min(10, this.props.health)
    let maxHealth = this.props.maxHealth || 10;
    let percentage = Math.floor((health / maxHealth) * 100);

    return (
      <div className="outer-bar" style={{
        width: '70%',
        border: 'solid',
        borderColor: 'black',
        borderRadius: '8px',
        borderWidth: '3px',

      }}>
        <div className="inner-bar" style={{
          width: percentage + '%',
          height: '8px',
          backgroundColor: 'red',
          borderRadius: '3px'
        }}>
        </div>
      </div>
    )
  }

}


export default HealthBar