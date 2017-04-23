import React from 'react';
import '../assets/kickKing.css';

export default class KickKing extends React.Component {
  render() {
    console.log('KICK KING PROPS', this.props);
    return (
      <div className="king-options-container">
        <div className="king-text">
          <div>YOU WERE ATTACKED</div>
          <div>STAY IN THE CITY?</div>
        </div>
        <div className="king-bttns">
          <div className="king-bttn-yes" onClick={() => this.props.stayOnHill()}>YES</div>
          <div className="king-bttn-no" onClick={() => this.props.setKing()}>NO</div>
        </div>
      </div>
    );
  }
}
