import React from 'react';
import { Link } from 'react-router-dom';
import StartGame from '../containers/StartGameContainer';
import '../assets/lobby.css';

export default class Lobby extends React.Component {

  grabPic() {}

  renderLobby() {
    return (
      <div className="lobby-container">
        <div className="column1">
          {/* <div style={{ fontWeight: 'bold' }}>Room Name</div>*/}
          <div style={{ fontSize: '30px' }}>{this.props.game ? this.props.game.name : null} Lobby</div>
          <Link to="/">
            <div
              className="leave-bttn"
              onClick={() => { this.props.leaveGame(this.props.auth.uid); }}
            >Leave</div>
          </Link>
        </div>
        <div className="column2">
          {this.props.lobby.map(person => <div style={{ width: '250px', height: '70px', alignItems: 'center', display: 'flex', flexDirection: 'row', flex: 1, backgroundColor: 'lightblue', borderRadius: '10px', margin: '10px', padding: '10px', boxShadow: 'grey -1px 3px 10px', backgroundColor: 'white' }} key={person}>
            <div style={{ flex: 1 }}><img style={{ borderRadius: '100%', width: '75px' }} src={person[1]} /></div>
            <div style={{ flex: 1 }}>{person[0]}</div>
          </div>)}
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div>
        { this.props.game && this.props.game.started ? null : this.renderLobby() }

        { this.props.game && this.props.game.gid === this.props.auth.gid && <div style={{ margin: '5px' }}><StartGame /></div>}
      </div>
    );
  }
}

