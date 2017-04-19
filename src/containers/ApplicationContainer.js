import { connect } from 'react-redux';
import Application from '../components/Application';
import { signIn, signOut } from '../actions/auth';

const mapStateToProps = state => (state);

const mapDispatchToProps = dispatch => ({
  signIn() { dispatch(signIn()); },
  signOut(...args) { dispatch(signOut(...args)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);

