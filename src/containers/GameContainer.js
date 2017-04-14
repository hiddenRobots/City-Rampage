import { connect } from 'react-redux';
import Game from '../components/Game';
import { startGame, endTurn } from '../actions/game';
import { marketListener } from '../actions/market';


const mapStateToProps = state => ({
  game: state.game,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  startGame() { dispatch(startGame()); },
  marketListener() { dispatch(marketListener()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
