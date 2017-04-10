import React, { PropTypes } from 'react';

const SignIn = ({ signIn }) => (
  <div className="SignIn">
    <button
      className="block"
      onClick={signIn}
    >
        Sign In
      </button>
  </div>
  );

SignIn.propTypes = {
  signIn: PropTypes.func,
};

export default SignIn;
