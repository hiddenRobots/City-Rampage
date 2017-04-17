import React from 'react';
import { Link } from 'react-router-dom';
import StartGame from '../containers/StartGameContainer';

export default class Lobby extends React.Component {

  renderLobby() {
    return (
      <div>
        <h3>Lobby: {this.props.game.name}</h3>
        <h4>Players in lobby:</h4>
        {this.props.lobby.map(person => <div key={person}> Name/ID: {person}</div>)}
        <button onClick={() => this.props.playersInLobby(this.props.gid)} >show me whos here!</button>

        <Link to="/games-list">
          <button
            onClick={() => { this.props.leaveGame(this.props.auth.uid); }}
          >Leave</button>
        </Link>
      </div>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div>
        { this.props.game.started ? null : this.renderLobby() }

        { this.props.game.gid === this.props.auth.gid && <StartGame />}
      </div>
    );
  }
}

