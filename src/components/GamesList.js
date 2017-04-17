import React from 'react';
import Lobby from '../containers/LobbyContainer';
import '../assets/gamesList.css';

export default class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gid: '',
    };

    this.changeGid = this.changeGid.bind(this);
  }
  componentWillMount() {
    this.props.grabListOfGames();
  }

  changeGid(gid) {
    this.setState({
      gid,
    });
  }

  renderLobbyTiles() {
    return (
      <div className="lobby_tiles_container">
        {this.props.gamesList.map(gameItem =>
          <div className="lobby_tile" key={gameItem.gid}>
            <div className="room_name">Room Name:</div>
            <div className="room_name">{gameItem.name}</div>
            <button onClick={() => { this.changeGid(gameItem.gid); this.props.joinGame(this.props.auth.uid, gameItem.gid); }}>JOIN GAME</button>
          </div>)}
      </div>
    );
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        { this.renderLobbyTiles() }

        {this.state.gid !== '' && <Lobby gid={this.state.gid} />}
      </div>
    );
  }
}
