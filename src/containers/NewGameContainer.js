import { connect } from 'react-redux';
import NewGame from '../components/NewGame';
import { createNewGame } from '../actions/newGame';
import { bindActionCreators } from 'redux';


// function mapStateToProps(state) {
//   return {
//     gamesList: state.gamesList,

//   };
// }

// const mapDispatchToProps = dispatch => ({
//   createNewGame(...args) { dispatch(createNewGame(...args)); },
// });

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewGame,
    },
   dispatch);
}

export default connect(null, matchDispatchToProps)(NewGame);
