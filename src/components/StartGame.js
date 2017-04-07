import React from 'react';

export default class StartGame extends React.Component {
  render() {
    console.log(this.props, 'startGame component Is getting CRAY');
    return (
      <div><button onClick={() => { this.props.startGame(); }}>Start Game</button>
        <div>Who's going? {this.props.game}</div>
      </div>
    );
  }
}

