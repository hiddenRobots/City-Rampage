import React, { PropTypes } from 'react';
import { database } from '../firebase';
import { charactersOBJ } from '../initial-state';

import map from 'lodash/map';
import DiceBox from '../containers/DiceBoxContainer';
import energy from '../assets/media/energy.png';
import health from '../assets/media/health.png';
import points from '../assets/media/points.png';
import playerHandImage from '../assets/media/playerHand.png';
import HealthBar from '../components/HealthBar';
import PlayerHand from './PlayerHand';

import '../assets/CurrentUser.css';


import KickKing from '../containers/kickKingContainer';


// this can be temporary, just a thought


class CurrentUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHand: {},
      reRender: true,
    };
  }

  generatePlayerIcon(playerObj, gameData) {
    let icon = '';
    if (playerObj.stats.health <= 0) icon += '☠';
    if (gameData) {
      if (gameData.king && playerObj.uid === gameData.king.uid) icon += '👑';
      if (gameData.chosenOne && playerObj.uid === gameData.chosenOne.uid) icon += '👈';
    }
    return icon;
  }

  stlyeChosenOne(playerUID) {
    return this.props.game.chosenOne && playerUID === this.props.game.chosenOne.uid ? 'chosenOne' : 'notChosenOne';
  }

  revealHand(uid) {
    this.state.showHand[uid] = !this.state.showHand[uid];
    // this.setState = { reRender: !this.state.reRender };
    this.forceUpdate();
  }

  checkKing() {
    let kingAttack = false;
    if (this.props.game.king !== undefined) {
      kingAttack = this.props.auth.uid === this.props.game.king.uid &&
        this.props.game.kingAttackedOnTurn === true &&
        this.props.game.king !== null &&
        this.props.game.chosenOne.uid !== this.props.auth.uid;
    }
    return kingAttack;
  }

  turnBanner() {
    const game = this.props.game;

    if (game.chosenOne.uid !== this.props.auth.uid && this.props.auth.uid === game.king.uid && game.kingAttackedOnTurn) {
      // you are the king and someone is attacking you
      return <p> {`It is ${game.chosenOne.displayName}'s turn and she/he is attacking you`} </p>;
    } else if (game.chosenOne.uid !== this.props.auth.uid) {
      // not your turn
      return <p> {`It is ${game.chosenOne.displayName}'s turn`} </p>;
    } else if (!game.submitted) {
      // your turn roll phase
      return <p>{'Roll phase: roll the die and select the any you want to keep, dice will submit when you press submit or after your third roll'}</p>;
    } else if (game.king.displayName && game.kingAttackedOnTurn) {
      // your turn and you are attacking the king
      return <p>{`You just attacked the the king, ${game.king.displayName} is being asked if he wants to leave the city`}</p>;
    }
    // your turn, already submitted roll and resolved attacks on king
    return <p>{'Buy phase: Buy any cards from the market and then end your turn'}</p>;
  }


  render() {
    const { auth } = this.props;

    return (
      <div className="CurrentUser">
        <div className="CurrentUser--identification" style={{ flexDirection: 'column', display: 'flex' }}>

          <div className="tip" style={{ }}>
            {this.turnBanner()}
            {/* this will link you to an unbuilt rules page */}
            <a href="/rules" target="_blank" rel="noopener noreferrer" >RULES</a>
          </div>

          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>

            {map(this.props.playersOnline, (player, uid) => (
              <div key={player.uid} >
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
                  <div style={{ marginLeft: '20px', flex: 1 }} >
                    { (player.uid == this.props.game.chosenOne.uid) && <DiceBox auth={this.props.auth} />}
                  </div>
                  <div key={player.uid} className={this.stlyeChosenOne(player.uid)} style={{ display: 'flex', flex: 1, maxWidth: '400px', flexDirection: 'row', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingLeft: '10px', paddingRight: '10px', cursor: 'pointer' }} onClick={() => this.revealHand(uid)}>
                    <div style={{ flex: 1 }}><img style={{ margin: '10px', width: '100px', height: '100px', borderRadius: 100 }} src={charactersOBJ[this.props.game.players[player.uid].character.image]} alt={player.photoURL} /></div>
                    <div style={{ flex: 3 }}>
                      <div style={{ flex: 1, flexDirection: 'column', alignSelf: 'center', margin: '10px' }}>

                        <div style={{ fontSize: '24px', margin: '10px' }}>{player.displayName} {this.generatePlayerIcon(player, this.props.game)} <HealthBar health={player.stats.health} /> </div>
                        <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>

                          <div style={{ flex: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1, margin: '5px' }}><img style={{ width: '25px', height: '25px' }} src={health} /></div>
                            <div style={{ flex: 1, margin: '5px', fontSize: '16px' }}> {player.stats.health}</div>
                          </div>
                          <div style={{ flex: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1, margin: '5px' }}><img style={{ width: '25px', height: '25px' }} src={energy} /></div>
                            <div style={{ flex: 1, margin: '5px', fontSize: '16px' }}> {player.stats.energy}</div>
                          </div>
                          <div style={{ flex: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1, margin: '5px' }}><img style={{ width: '25px', height: '25px' }} src={points} /></div>
                            <div style={{ flex: 1, margin: '5px', fontSize: '16px' }}> {player.stats.points}</div>
                          </div>
                          <div style={{ flex: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1, margin: '5px' }}><img style={{ width: '25px', height: '25px' }} src={playerHandImage} /></div>
                            <div style={{ flex: 1, margin: '5px', fontSize: '16px' }}> { player.hand ? player.hand.length : 0 }</div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center' }}><div style={{ marginLeft: '15px' }}>{((player.uid === this.props.game.king.uid) && this.checkKing()) && <KickKing />}</div></div>
                </div>
                { !this.state.showHand[uid] ? this.state.showHand[uid] = false : null }
                {this.state.showHand[uid] && Array.isArray(player.hand) && <PlayerHand cards={player.hand} />}
              </div>
              ))
            }
          </div>
          {/* <button onClick={() => this.revealHand()}>{this.state.showHand ? 'HideCards' : 'ShowCards'}</button>*/}
          {/*

          <button onClick={() => { this.props.increaseHealth(auth.uid); }} >up health</button>

          <button onClick={() => { this.props.increaseHealth(auth.uid); }} >up health</button>

          <button onClick={() => { this.props.decreaseHealth(auth.uid); }}>down health</button>
          <button onClick={() => { this.props.increasePoints(auth.uid); }} >up Points</button>
          <button onClick={() => { this.props.decreasePoints(auth.uid); }}>down Points</button>
          <button onClick={() => { this.props.increaseEnergy(auth.uid); }} >up Energy</button>
          <button onClick={() => { this.props.decreaseEnergy(auth.uid); }}>down Energy</button>*/}
        </div>
      </div >
    );
  }
}

export default CurrentUser;
