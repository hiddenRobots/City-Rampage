import React from 'react';

import energy from '../assets/media/energy.png';
import '../assets/playerhand.css';

class PlayerHand extends React.Component {
  constructor(props) {
    super(props);
  }

  createHand() {
    return this.props.cards.map(card => (
      <div key={card.title} className="hand-cards cards">
        <div className="card-cost">
          <div><img className="cost-logo" src={energy} alt="E" /></div>
          <div className="cost-logo"> {card.cost}</div>
        </div>
        <div className="card-title"><div>{card.title}</div></div>
        <div className="card-ability"><div>{card.ability}</div></div>
        <div className="card-type">{card.type}</div>
      </div>
      ),
    );
  }

  render() {
    return (
      <div className="hand-container">
        { this.createHand() }
      </div>
    );
  }
}

export default PlayerHand;
