import React from 'react';
import { Link } from 'react-router-dom';

import StartGame from './StartGame';

export default class Lobby extends React.Component {

  // componentWillMount() {
  //   this.props.playersInLobby(this.props.gid);
  // }

  render() {
    // console.log(this.props);
    return (
      <div>
        <h3>Lobby</h3>
        {/* show a list of players in the game */}
        <h4>Players in lobby:</h4>
        {this.props.lobby.map(person => <div key={person}> Name/ID: {person}</div>)}
        <button onClick={() => this.props.playersInLobby(this.props.gid)} >show me whos here!</button>
        {/* StartGame button in here*/}
        {/* <button onClick={() => this.props.startGame()}>Start Game</button>*/}

        <Link to="/games-list">
          <button
            onClick={() => {
              this.props.leaveGame(this.props.auth.uid);
            }}
          >Leave</button>
        </Link>
        <StartGame heyListen={this.props.heyListen} game={this.props.game} startGame={this.props.startGame} />
      </div>
    );
  }
}

