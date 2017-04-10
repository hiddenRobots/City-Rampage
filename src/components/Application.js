import React, { PropTypes } from 'react';
import SignIn from './SignIn';
import Loading from './Loading';
import Home from './Home';
import NewGame from '../containers/NewGameContainer';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GamesList from '../containers/GamesListContainer';
import '../Assets/App.css';

const Application = ({ auth, signIn, signOut, game }) => (
  <Router>
    <main className="Application">
      <div>
        <div className="nav-container">
          { auth.status === 'ANONYMOUS' && <SignIn signIn={signIn} /> }
          { auth.status === 'AWAITING_AUTH_RESPONSE' && <Loading /> }
          <div><Link className="nav-link" to="/">Home</Link></div>
          { auth.status === 'SIGNED_IN' && <div><Link className="nav-link" to="/newgame">New Game</Link></div> }
          { auth.status === 'SIGNED_IN' && <div><Link className="nav-link" to="/gamesList">Games List</Link></div> }
        </div>

        <Route exact path="/" component={Home} />
        { auth.status === 'SIGNED_IN' && <Route path="/newgame" component={NewGame} /> }
        { auth.status === 'SIGNED_IN' && <Route path="/gamesList" component={GamesList} /> }
      </div>
    </main>
  </Router>
);


export default Application;

