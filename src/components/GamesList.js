import React from 'react';
import Lobby from '../containers/LobbyContainer';

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
  render() {
    return (
      <div>
        {this.props.gamesList.map(gameItem =>
          <div style={{ border: '1px solid black', width: ' 200px' }} key={gameItem.gid}>
            <p>{gameItem.gid}</p><p>{gameItem.name}</p>
            <button onClick={() => { this.changeGid(gameItem.gid); this.props.joinGame(this.props.auth.uid, gameItem.gid); }}>join this game</button>
          </div>)}

        {this.state.gid !== '' && <Lobby gid={this.state.gid} />}
      </div>
    );
  }
}
