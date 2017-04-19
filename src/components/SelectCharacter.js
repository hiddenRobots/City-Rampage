import React, { Component } from 'react';

import rick from '../assets/media/funMonsters/rick.png';
import cenaSmash from '../assets/media/funMonsters/cenaSmash.png';
import cyberKitty from '../assets/media/funMonsters/cyberKitty.png';
import gigazaur from '../assets/media/funMonsters/gigazaur.png';
import golfMeeseeks from '../assets/media/funMonsters/golfMeeseeks.png';
import kingDedede from '../assets/media/funMonsters/kingDedede.png';
import '../assets/selectCharacters.css';

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
      <div className="char-div" style={character.selected ? { border: '2px solid red' } : {}} onClick={() => this.props.selectCharacter(this.props.state.auth.uid, character, index)}>
        <div className="char-name">{character.name.toUpperCase()}</div>
        <img style={{ width: '150px', height: '150px' }} src={charactersOBJ[character.image]} />
      </div>
    ));
  }

  render() {
    console.log('here are selectCHAR props', this.props.state);
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>

        { this.createPlayerImages() }

      </div>

    );
  }
}

export default SelectCharacter;
