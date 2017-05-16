import React from 'react';
import Lobby from '../containers/LobbyContainer';
import '../assets/gamesList.css';

export default class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gid: '',
      joined: false,
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
      <div className="lobby_tiles_container" style={{ padding: '20px' }}>
        {this.props.gamesList.map(gameItem =>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: 1 }} />
            <div className="lobby_tile" style={{ flex: 1 }} key={gameItem.gid} onClick={() => { this.changeGid(gameItem.gid); this.props.joinGame(this.props.auth.uid, gameItem.gid); this.setState({ joined: true }); }}>
              <div style={{ fontWeight: 'bold', flex: 1, display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', fontSize: '30px' }}>{gameItem.name}</div>
              </div>
              {/* <div>{ this.props.game[gameItem.name] && this.props.game.playerPosition ? this.props.game.playerPosition.length : 0 }</div>*/}
              <div style={{ width: '100px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ flex: 1, alignContent: 'center', textAlign: 'center', cursor: 'pointer' }}>JOIN GAME</div>
              </div>
            </div>
            <div style={{ flex: 1 }} />
          </div>,
          )}
      </div>
    );
  }

  render() {
    return (
      <div>
        { !this.state.joined ? <div><div style={{ fontSize: '35px', padding: '10px', textAlign: 'center', fontWeight: 'bold', paddingTop: '25px', paddingBottom: '-10px' }}>GAME LIST</div>
          <div>{ this.renderLobbyTiles() }</div>
        </div> : <div>{this.state.gid !== '' && <Lobby gid={this.state.gid} />}</div>}

      </div>
    );
  }
}
