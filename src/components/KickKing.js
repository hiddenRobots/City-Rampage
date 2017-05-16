import React from 'react';
import '../assets/kickKing.css';

export default class KickKing extends React.Component {
  render() {
    return (
      <div className="king-options-container">
        <div className="king-text">
          <div>YOU WERE ATTACKED</div>
          <div>DO YOU WANT TO LEAVE THE CITY?</div>
        </div>
        <div className="king-bttns">
          <div className="king-bttn-yes" onClick={() => this.props.setKing()}>YES</div>
          <div className="king-bttn-no" onClick={() => this.props.stayOnHill()}>NO</div>
        </div>
      </div>
    );
  }
}
