import { connect } from 'react-redux';
import StartGame from '../components/StartGame';
import { startGame } from '../actions/game';
import { heyListen } from '../actions/game';
import { bindActionCreators } from 'redux';


function mapStateToProps(state) {
  return {
    game: state.game,
    auth: state.auth,
  };
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startGame,
      heyListen,
    },
   dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StartGame);
