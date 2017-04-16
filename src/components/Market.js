import React, { Component } from 'react';
import '../assets/market.css';
import energy from '../assets/media/energy.png';

class Market extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.marketListener();
    this.props.resetMarket();
  }

  createMarket() {
    return this.props.market.face_up.map(card => (
      <div
        key={card.title}
        className="market-cards cards"
        onClick={() => this.props.buyCard(card, this.props.user, this.props.chosenOne_uid)}
      >
        <div className="card-cost">
          <div><img className="cost-logo" src={energy} alt="E" /></div>
          <div className="cost-logo"> {card.cost}</div>
        </div>

        <div className="card-title"><div>{card.title}</div></div>
        <div className="card-ability"><div>{card.ability}</div></div>
        <div className="card-type">{card.type}</div>
      </div>
      ));
  }

  render() {
    return (
      <div>
        <div className="market-container">

          <div>
            <button
              id="reset-bttn"
              onClick={() => this.props.userResetMarket(this.props.user, this.props.chosenOne_uid)}
            >
              <div className="in-bttn">
                <div>ResetCards</div>
                <div className="card-cost">
                  <div style={{ fontSize: '15px' }}> —2 </div>
                  <div><img className="cost-logo" src={energy} alt="E" /></div>
                </div>
              </div>
            </button>
          </div>
          <br />

          <div className="market-cards deck-disc">
            <div>Deck</div>
            <div>{this.props.market.deck.length} cards</div>
          </div>

          { this.createMarket() }

          <div className="market-cards deck-disc">
            <div>Discar Pile</div>
            <div>{this.props.market.discarded.length} cards</div>
          </div>

        </div>
      </div>
    );
  }
}

export default Market;
