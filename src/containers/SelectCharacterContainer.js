import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectCharacter from '../components/SelectCharacter';
import { selectCharacter } from '../actions/selectCharacter';

function mapStateToProps(state) {
  return {
    state,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectCharacter,
    },
   dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SelectCharacter);
