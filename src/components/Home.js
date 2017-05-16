import React from 'react';
import '../assets/home.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import NewGame from '../containers/NewGameContainer';
import Lobby from '../containers/LobbyContainer';
import GamesList from '../containers/GamesListContainer';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      cont: false,
      new: false,
    };
  }

  joinedClick() {
    this.setState({ joined: true });
  }

  /* renderSignOut() {
    return (
      <div className="nav-link sign-out" onClick={() => { this.props.auth ? this.props.signOut(this.props.auth.uid) : null; }}>
        Sign Out
      </div>
    );
  }*/

  render() {
    // is the following line still necessary ?
    // const test = (this.state.joined === false && this.state.cont === false && this.state.new === false);
    return (
      <div className="reception-container">
        <div
          style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
        >

          <Link className="nav-link-btn" to="/newgame">
            <div style={{ alignSelf: 'center', border: '2px solid black', padding: '15px', borderRadius: '3px' }}>
              New Game
              </div>
          </Link>


          <Link className="nav-link-btn" to="/games-list">
            <div style={{ alignSelf: 'center', border: '2px solid black', padding: '15px', borderRadius: '3px' }}>
              Games List
            </div>
          </Link>


          <Route path="/newgame" component={NewGame} />
          <Route exact path="/games-list" component={GamesList} />

          {/* <div className="welcome">
            <span>Welcome to City Rampage!</span>
            { this.props.auth.status === 'SIGNED_IN' && this.renderSignOut()}
          </div>*/}

          {/* <div className="credits">
            <div className="cred-title">Credits</div>

            <div className="author"><a target="_blank" href="https://www.linkedin.com/in/zachary-lipps-a60071b2/">Zach Lipps</a></div>
            <div className="author"><a target="_blank" href="https://github.com/derekalia">Derek Alia</a></div>
            <div className="author"><a target="_blank" href="https://github.com/westinfunk">Westin Funk</a></div>
            <div className="author"><a target="_blank" href="https://www.linkedin.com/in/jaime-pericas-saez/">Jaime Pericas</a></div>

          </div>
          */}

          {/* <div className="inspiration">
            <div className="true-author">Based on King of Tokyo</div>
            <div>by Richard Garfield</div>
          </div>*/}


          <div style={{ flex: 1, margin: '50px' }}>
            <div className="rules">
            Game Rules
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
