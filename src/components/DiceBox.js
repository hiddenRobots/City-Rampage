import React, { Component } from 'react';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

class DiceBox extends Component {


  render() {
    const endTurnButton = (this.props.game.chosenOne && this.props.game.chosenOne.uid === this.props.auth.uid) ?
      <button onClick={() => { this.props.endTurn(); }}> End Turn</button> : undefined;

    const rolled = this.props.diceBox.one.val;
    return (
      <div>
        <div style={{ display: 'flex', border: '1px solid black' }}>
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid green', flex: 1 }}>
            <div style={{ flex: 1 }}> DICEBOX </div>

            {/* {this.props.auth.uid === this.props.game.chosenOne.uid ? <button onClick={() => { this.props.rollDice(); }}>Roll {this.props.game.rollCount}</button> : <div>waiting...</div>}*/}
            <button onClick={() => { this.props.rollDice(this.props.auth.uid, this.props.game.chosenOne.uid); }}>Roll {this.props.game.rollCount}</button>

            {(rolled !== '?' && this.props.auth.uid === this.props.game.chosenOne.uid) ? <div><div style={{ flex: 1 }}> <hr /> </div><button onClick={this.props.game.submitted ? () => { console.log('already called'); } : () => { this.props.submitRoll(); }}>{this.props.game.submitted ? 'already submitted' : 'submit'}</button></div> : <div />}

          </div>

          <div style={{ flexDirection: 'column', flex: 4, border: '1px solid orange', display: 'flex' }}>
            <div style={{ border: '1px solid purple', flexFlow: 'row-wrap', flex: 1, justifyContent: 'space-around' }}>
              {map(this.props.game.diceBox, (item, key) => <div className={item.selected ? 'dice-toggled' : 'dice'}onClick={() => this.props.selectDice(key)} key={key}>{item.val}</div>)}
            </div>
          </div>

        </div>
        {endTurnButton}
      </div>
    );
  }
}

export default DiceBox;
