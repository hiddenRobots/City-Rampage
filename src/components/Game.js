import React from 'react';
import CurrentUser from '../containers/CurrentUserContainer';
import DiceBox from '../containers/DiceBoxContainer';
import Market from '../containers/MarketContainer';
import KickKing from '../containers/kickKingContainer';
import ChatBox from '../containers/ChatBoxContainer';
import '../assets/Game.css';

import map from '../assets/media/sf-map.png';
import rick from '../assets/media/funMonsters/rick.png';
import cenaSmash from '../assets/media/funMonsters/cenaSmash.png';
import cyberKitty from '../assets/media/funMonsters/cyberKitty.png';
import gigazaur from '../assets/media/funMonsters/gigazaur.png';
import golfMeeseeks from '../assets/media/funMonsters/golfMeeseeks.png';
import kingDedede from '../assets/media/funMonsters/kingDedede.png';

const charactersOBJ = {
  rick,
  cenaSmash,
  cyberKitty,
  gigazaur,
  golfMeeseeks,
  kingDedede,
};


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

  kingOrWinnerImage() {
    if (this.props.game.winner) {
      return this.props.game.winner.character.image;
    }
    return this.props.game.king.character.image;
  }

  kingOrWinnerText() {
    if (this.props.game.winner) {
      return `${this.props.game.winner.displayName} HELLA WINS`;
    }
    return `KING : ${this.props.game.king.displayName}`;
  }

  render() {
    // console.log('Game Component', this.props, this.props.game.chosenOne !== this.props.auth.uid);
    console.log(this.props.game);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <div style={{ position: 'relative', flex: 1, display: 'flex', alignContent: 'center', justifyContent: 'center' }}>

          <img style={{ display: 'flex', flex: 1, height: '190px', borderRadius: '8px', alignItems: 'center' }} src={map} />

          { this.props.game.king.uid && <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'absolute',
              left: '45%',
             /* top: '10%', */
            }}
          >
            <img
              style={{ width: '150px',
                /* boxShadow: 'grey -1px 3px 10px', */
                height: '150px',
                /* borderRadius: '100%', */
                borderColor: 'black',
                borderWidth: '2px',
              }} src={charactersOBJ[this.kingOrWinnerImage()]}
            />
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>{this.kingOrWinnerText()}</div>
          </div>}

        </div>


        <Market />
        {this.checkKing() && <KickKing />}

        <CurrentUser auth={this.props.auth} />
        <ChatBox />
        {/* <DiceBox auth={this.props.auth} />*/}


      </div>
    );
  }

}

