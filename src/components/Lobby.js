import React from 'react';
import { Link } from 'react-router-dom';
import StartGame from '../containers/StartGameContainer';
import '../assets/lobby.css';

export default class Lobby extends React.Component {

  renderLobby() {
    return (
      <div className="lobby-container">
        <div className="column1">
          <div style={{ fontWeight: 'bold' }}>Room Name</div>
          <div>{this.props.game.name}</div>
          <Link to="/">
            <button
              className="leave-bttn"
              onClick={() => { this.props.leaveGame(this.props.auth.uid); }}
            >Leave</button>
          </Link>
        </div>
        <div className="column2">
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}> Players in Lobby</div>
          {this.props.lobby.map(person => <div key={person}>{person}</div>)}
          <div><button className="leave-bttn" onClick={() => this.props.playersInLobby(this.props.gid)}>Show Players!</button></div>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div>
        { this.props.game.started ? null : this.renderLobby() }

        { this.props.game.gid === this.props.auth.gid && <div style={{ margin: '5px' }}><StartGame /></div>}
      </div>
    );
  }
}

