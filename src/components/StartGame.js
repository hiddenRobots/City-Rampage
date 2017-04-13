import React from 'react';
import Game from '../containers/GameContainer';

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
      <div>{!this.props.game.started && <button onClick={() => { this.props.startGame(); this.handleStartGame(); }}>Start Game</button>}
        {/* <div>Who's going? {this.props.game}</div>*/}
        {/* {this.props.game.started ?  : <div />}*/}
        {this.props.game.started ? <div><Game /></div> : <div />}
        {/* <div><Game /></div>*/}


      </div>

    );
  }
}

