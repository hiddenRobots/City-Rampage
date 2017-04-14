import React, { Component } from 'react';

class Market extends Component {
  constructor(props) {
    super(props);
    this.cardStyle = { margin: '10px', width: '100px', height: '120px', border: '1px solid black', float: 'left' };
  }

  componentWillMount() {
    this.props.marketListener();
    this.props.resetMarket();
  }

  createMarket() {
    return this.props.market.face_up.map(card => (
      <div key={card.title} onClick={() => this.props.buyCard(card, this.props.user, this.props.chosenOne_uid)} className="market-card" style={this.cardStyle}>
        <div>{card.title}</div>
        <div>Type: {card.type}</div>
        <div>Cost: {card.cost}</div>
        <div>Effect: {card.ability}</div>
      </div>
      ));
  }

  render() {
    return (
      <div className="market-container" style={{ marginBottom: '25px', margin: '10px', border: '1px solid black', height: '165px', width: '625px' }}>
        <button onClick={() => this.props.userResetMarket(this.props.user, this.props.chosenOne_uid)}> ResetCards </button><br />
        <div style={this.cardStyle}>Deck</div>
        { this.createMarket() }
        <div style={this.cardStyle}>Discar Pile</div>
      </div>
    );
  }
}

export default Market;
