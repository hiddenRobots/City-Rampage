import React, { PropTypes } from 'react';
import SignIn from './SignIn';
import CurrentUser from '../containers/CurrentUserContainer';
import Loading from './Loading';
import DiceBox from '../containers/DiceBoxContainer';
import Game from '../containers/GameContainer';
import Market from '../containers/MarketContainer';

const Application = ({ auth, signIn, signOut, game }) => (
  <main className="Application">
    <div className="Application--sidebar">

      { auth.status === 'ANONYMOUS' && <SignIn signIn={signIn} /> }
      { auth.status === 'AWAITING_AUTH_RESPONSE' && <Loading /> }
      { auth.status === 'SIGNED_IN' && <CurrentUser auth={auth} signOut={signOut} />}
      { game.length === 0 ? <Game /> : <div><DiceBox /> <Market /></div>}


    </div>

  </main>
);

Application.propTypes = {
  auth: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  game: PropTypes.array.isRequired,
};

export default Application;
