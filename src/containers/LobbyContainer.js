import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lobby from '../components/Lobby';
import { playersInLobby } from '../actions/lobby';
import { startGame } from '../actions/game';
import { leaveGame } from '../actions/games';
import { heyListen } from '../actions/game';
import { marketListener } from '../actions/market';


const mapStateToProps = state => ({
  lobby: state.lobby,
  auth: state.auth,
  game: state.game,

});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      playersInLobby,
      startGame,
      leaveGame,
      heyListen,
      marketListener,
    },
   dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
