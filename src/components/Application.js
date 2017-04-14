import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Loading from './Loading';
import Lobby from '../containers/LobbyContainer';
import Home from '../containers/HomeContainer';
import NewGame from '../containers/NewGameContainer';
import GamesList from '../containers/GamesListContainer';
import '../Assets/App.css';

const Application = ({ auth, signIn, signOut, game }) => (
  <Router>
    <main className="Application">
      <div>
        <div className="nav-container">
          <div><Link className="nav-link" to="/">Home</Link></div>
          { auth.status === 'ANONYMOUS' && <div><SignIn signIn={signIn} /></div> }
          { auth.status === 'SIGNED_IN' && <div><Link className="nav-link" to="/newgame">New Game</Link></div> }
          { auth.status === 'SIGNED_IN' && <div><Link className="nav-link" to="/games-list">Games List</Link></div> }
        </div>
        { auth.status === 'AWAITING_AUTH_RESPONSE' && <Loading /> }

        <Route exact path="/" component={Home} />
        <Route path="/newgame" component={NewGame} />
        <Route exact path="/games-list" component={GamesList} />
        <Route path="/games-list/lobby/:game" component={Lobby} />
      </div>
    </main>
  </Router>
);


export default Application;

