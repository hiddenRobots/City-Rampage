import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Market from '../components/Market';
import { buyCard, resetMarket, addToHand, dealCard } from '../actions/market';


function mapStateToProps(state) {
  return {
    market: state.market,
    user: state.auth.uid,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      buyCard,
      resetMarket,
      addToHand,
      dealCard,
    },
   dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Market);

