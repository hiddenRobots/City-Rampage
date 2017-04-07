import React, { PropTypes } from 'react';
import { database } from '../firebase';
import User from './User';

class CurrentUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { auth, signOut } = this.props;
    return (
      <div className="CurrentUser">
        <img
          className="CurrentUser--photo"
          src={auth.photoURL}
          alt={auth.displayName}
        />
        <div className="CurrentUser--identification">
          <h3 className="CurrentUser--displayName">{ auth.displayName }</h3>
          <p className="CurrentUser--email">{ auth.email }</p>
          <button
            className="CurrentUser--signout"
            onClick={() => { signOut(auth.uid); console.log('im gere', auth); }}
          > Sign Out</button>

          {this.props.playersOnline.map(user => <div key={user.uid}>{user.displayName}
            <ul>
              <li>energy {user.stats.energy}</li>
              <li>health {user.stats.health}</li>
              <li>points {user.stats.points}</li>
            </ul>
          </div>)}

          <button onClick={() => { this.props.increaseHealth(auth.uid); }} >up health</button>
          <button onClick={() => { this.props.decreaseHealth(auth.uid); }}>down health</button>
          <button onClick={() => { this.props.increasePoints(auth.uid); }} >up Points</button>
          <button onClick={() => { this.props.decreasePoints(auth.uid); }}>down Points</button>
          <button onClick={() => { this.props.increaseEnergy(auth.uid); }} >up Energy</button>
          <button onClick={() => { this.props.decreaseEnergy(auth.uid); }}>down Energy</button>
          <button onClick={() => { this.props.joinGame(auth.uid); }}> JOIN GAME </button>
          <button onClick={() => { this.props.leaveGame(auth.uid); }}> LEAVE GAME </button>
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  auth: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }),
  signOut: PropTypes.func.isRequired,
};

export default CurrentUser;
