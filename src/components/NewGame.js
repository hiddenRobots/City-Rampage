import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/newGame.css';

export default class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleName = this.handleName.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  handleName(e) {
    // e.preventDefault();
    this.setState({
      name: e.target.value,
    });
  }

  submitInput() {
    // e.preventDefault();
    if (this.state.name !== '') {
      this.props.createNewGame(this.state.name);
    }
  }


  render() {
    return (
      <div className="form-container">
        <div className="new_game_form">
          {/* <form onSubmit={this.submitInput}>
          <label>
            Game Name
            <input type="text" onChange={e => this.handleName(e)} name="Game Name" />
          </label>
          <input type="submit" value="Create Game" />
        </form>*/}
          <div style={{ fontSize: '35px' }}> Room Name </div>
          <div className="name_input">
            <input className="new-game-input" type="text" onChange={e => this.handleName(e)} name="Game Name" />
          </div>

          <Link to="/games-list">
            <button
              className="create-game-bttn"
              onClick={() => { this.submitInput(); }}
            >Create Game</button>
          </Link>

        </div>
      </div>
    );
  }
}

