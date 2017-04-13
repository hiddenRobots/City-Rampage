import React from 'react';
import CurrentUser from '../containers/CurrentUserContainer';
import DiceBox from '../containers/DiceBoxContainer';
import Market from '../containers/MarketContainer';
import KickKing from '../containers/kickKingContainer';

export default class Game extends React.Component {

  // componentWillMount() {
  //   this.props.marketListener();
  // }

//   didAttack() {

// }

  render() {
    // console.log(this.props);
    console.log('fix: make the NO button when asking the king if they want to leave do something ;) ');
    return (
      <div>
        <div />

        {(this.props.auth.uid === this.props.game.king.uid && this.props.game.attackedOnTurn === true && this.props.game.king !== null) && <KickKing />}
        <CurrentUser auth={this.props.auth} />
        <DiceBox auth={this.props.auth} />
        <Market />

      </div>
    );
  }

}

