import React, { Component } from 'react';
import { charactersOBJ } from '../initial-state';
import '../assets/selectCharacters.css';

class SelectCharacter extends Component {
  constructor(props) {
    super(props);
  }

  createPlayerImages() {
    return this.props.state.game.characters.map((character, index) => (
      <div className="char-div" key={character.name} style={character.selected ? { border: '3px solid blue' } : {}} onClick={() => this.props.selectCharacter(this.props.state.auth.uid, character, index)}>
        <div className="char-name">{character.name.toUpperCase()}</div>
        <img style={{ width: '150px', height: '150px' }} src={charactersOBJ[character.image]} />
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div style={{ fontSize: '35px', padding: '10px', textAlign: 'center', fontWeight: 'bold', paddingTop: '25px', paddingBottom: '-10px' }}>SELECT YOUR CHARACTER</div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          { this.createPlayerImages() }
        </div>
      </div>
    );
  }
}

export default SelectCharacter;
