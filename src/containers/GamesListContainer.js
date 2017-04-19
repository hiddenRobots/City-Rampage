import { connect } from 'react-redux';
import GamesList from '../components/GamesList';
import { grabListOfGames, joinGame } from '../actions/games';


function mapStateToProps(state) {
  return {
    gamesList: state.gamesList,
    auth: state.auth,
  };
}

const mapDispatchToProps = dispatch => ({
  grabListOfGames() { dispatch(grabListOfGames()); },
  joinGame(...args) { dispatch(joinGame(...args)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
