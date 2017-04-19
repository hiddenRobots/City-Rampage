import React from 'react';
import Game from '../containers/GameContainer';
import SelectCharacter from '../containers/SelectCharacterContainer';
import Confetti from './Confetti';
import '../assets/startGame.css';

export default class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
    };
  }
  componentDidMount() {
    this.props.heyListen();
    // this.props.marketListener();
  }
  handleStartGame() {
    // console.log('started the game');
    this.setState({
      started: true,
    });
  }

  addWinnerClass() {
    return this.props.game.winner ? 'win' : '';
  }


  render() {
    // console.log(this.props, 'startGame component Is getting CRAY');
    return (
      <div>{!this.props.game.started && <button className="start-bttn" onClick={() => { this.props.startGame(); }}>Start Game</button>}
        {/* <div>Who's going? {this.props.game}</div>*/}
        {/* {this.props.game.started ?  : <div />}*/}
        {(this.props.game.started && !this.props.game.charactersSelected) ? <div><SelectCharacter /></div> : <div />}
        {(this.props.game.started && this.props.game.charactersSelected) ? <div className={this.addWinnerClass()} ><Game /> </div> : <div />}
        {(this.props.game.winner ? <Confetti /> : <div />)}
        {/* <div><Game /></div>*/}


      </div>

    );
  }
}

