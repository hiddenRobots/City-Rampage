import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../components/Home';
import { signIn, signOut } from '../actions/auth';


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signIn,
      signOut,
    },
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
