import React from 'react';
import CurrentUser from '../containers/CurrentUserContainer';
import DiceBox from '../containers/DiceBoxContainer';
import Market from '../containers/MarketContainer';
import KickKing from '../containers/kickKingContainer';

import map from '../assets/media/sf-map.png';


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.checkKing = this.checkKing.bind(this);
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

  render() {
    // console.log('Game Component', this.props, this.props.game.chosenOne !== this.props.auth.uid);
    // console.log('fix: make the NO button when asking the king if they want to leave do something ;) ');
    return (
      <div>
        <div />
        <div style={{ flex: 1, display: 'flex', background: { map } }}>

          <div><img src={this.props.game.king.photoURL} /></div>

        </div>
        {this.checkKing() && <KickKing />}

        <CurrentUser auth={this.props.auth} />
        <DiceBox auth={this.props.auth} />
        <Market />

      </div>
    );
  }

}

