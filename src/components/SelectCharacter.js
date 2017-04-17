import React, { Component } from 'react';

import rick from '../assets/media/funMonsters/rick.png';
import cenaSmash from '../assets/media/funMonsters/cenaSmash.png';
import cyberKitty from '../assets/media/funMonsters/cyberKitty.png';
import gigazaur from '../assets/media/funMonsters/gigazaur.png';
import golfMeeseeks from '../assets/media/funMonsters/golfMeeseeks.png';
import kingDedede from '../assets/media/funMonsters/kingDedede.png';

const charactersOBJ = {
  rick,
  cenaSmash,
  cyberKitty,
  gigazaur,
  golfMeeseeks,
  kingDedede,
};

class SelectCharacter extends Component {
  constructor(props) {
    super(props);
  }

  createPlayerImages() {
    return this.props.state.game.characters.map((character, index) => (
      <div style={character.selected ? { border: '5px solid red' } : {}} onClick={() => this.props.selectCharacter(this.props.state.auth.uid, character, index)}>
        <h3>{character.name}</h3>
        <img style={{ width: '200px', height: '200px' }} src={charactersOBJ[character.image]} />
      </div>
    ));
  }

  render() {
    console.log('here are selectCHAR props', this.props.state);
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', flex: 1, maxWidth: '700px' }}>

        { this.createPlayerImages() }

      </div>

    );
  }
}

export default SelectCharacter;
