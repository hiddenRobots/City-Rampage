import React from 'react';
import Game from '../containers/GameContainer';
import SelectCharacter from '../containers/SelectCharacterContainer';

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

  render() {
    // console.log(this.props, 'startGame component Is getting CRAY');
    return (
      <div>{!this.props.game.started && <button onClick={() => { this.props.startGame(); }}>Start Game</button>}
        {/* <div>Who's going? {this.props.game}</div>*/}
        {/* {this.props.game.started ?  : <div />}*/}
        {(this.props.game.started && !this.props.game.charactersSelected) ? <div><SelectCharacter /></div> : <div />}
        {(this.props.game.started && this.props.game.charactersSelected) ? <div><Game /></div> : <div />}
        {/* <div><Game /></div>*/}


      </div>

    );
  }
}

