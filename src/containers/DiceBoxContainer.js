import { connect } from 'react-redux';
import diceBoxComponent from '../components/DiceBox';
import { rollDice, selectDice, submitRoll, endTurn } from '../actions/diceBox';

const mapStateToProps = state => ({
  diceBox: state.diceBox,
  rollCount: state.rollCount,
  game: state.game,
  auth: state.auth,
});


const mapDispatchToProps = dispatch => ({
  rollDice(...args) { dispatch(rollDice(...args)); },
  selectDice(...args) { dispatch(selectDice(...args)); },
  submitRoll(...args) { dispatch(submitRoll(...args)); },
  endTurn() { dispatch(endTurn()); },

});


export default connect(mapStateToProps, mapDispatchToProps)(diceBoxComponent);
