import React from 'react';
import StartGame from './StartGame';

export default class Lobby extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
        Lobby!
        <button onClick={() => this.props.playersInLobby(this.props.gid)} >show me whos here!</button>

        {/* show a list of players in the game */}
        {this.props.lobby.map(person => <div key={person}>{person}</div>)}
        {/* StartGame button in here*/}
        {/* <button onClick={() => this.props.startGame()}>Start Game</button>*/}
        <button onClick={() => { this.props.leaveGame(this.props.auth.uid); }}>Leave</button>
        <StartGame heyListen={this.props.heyListen} game={this.props.game} startGame={this.props.startGame} />
      </div>
    );
  }
}

