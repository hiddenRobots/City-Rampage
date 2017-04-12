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

  changeGid(gid) {
    console.log('i was changed!', gid);
    this.setState({
      gid,
    });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={() => this.props.grabListOfGames()}>get the games</button>

        <div>
          {this.props.gamesList.map(gameItem =>
            <div style={{ border: '1px solid black', width: ' 200px' }} key={gameItem.gid}>
              <p>{gameItem.gid}</p><p>{gameItem.name}</p>
              <button onClick={() => { this.changeGid(gameItem.gid); this.props.joinGame(this.props.auth.uid, gameItem.gid); }}>join this game</button>
            </div>)}

          {this.state.gid !== '' && <Lobby gid={this.state.gid} />}

        </div>
      </div>
    );
  }
}
