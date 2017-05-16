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
        onClick={this.props.submitted ? () => this.props.buyCard(card, this.props.user, this.props.chosenOne_uid) : null}
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
        <div className="market-container" style={{ justifyContent: 'center' }}>

          <div
            style={{ marginRight: '10px',
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                margin: '5px', textAlign: 'center', fontWeight: 'bold',
              }}
            >DECK - {this.props.market.deck.length} </div>
            <div
              id="reset-bttn"
              onClick={this.props.submitted ? () => this.props.userResetMarket(this.props.user, this.props.chosenOne_uid) : null}
            >
              <div className="in-bttn">
                <div className="card-cost">
                  <div style={{ fontSize: '20px', marginLeft: '8px' }}> 2 </div>
                  <div><img className="cost-logo" src={energy} alt="E" /></div>
                </div>
                <div className="wipe">WIPE DECK</div>
              </div>
            </div>
            <div
              style={{
                margin: '5px', textAlign: 'center', fontWeight: 'bold',
              }}
            >DISCARD - {this.props.market.discarded ? this.props.market.discarded.length : 0} </div>
          </div>
          <br />

          { this.createMarket() }


        </div>
      </div>
    );
  }
}

export default Market;
