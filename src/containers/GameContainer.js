import { connect } from 'react-redux';
import Game from '../components/Game';
import { startGame, endTurn } from '../actions/game';


const mapStateToProps = state => ({
  game: state.game,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  startGame() { dispatch(startGame()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
