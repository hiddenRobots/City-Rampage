import Confetti from 'react-confetti';
import React from 'react';

export default class ConfettiParty extends React.Component {
  render() {
    return (
      <div>
        <Confetti className="confetti" style={{ zIndex: 100 }} />
      </div>
    );
  }
}
