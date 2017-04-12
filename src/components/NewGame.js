import React from 'react';


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
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
  }

  submitInput(e) {
    e.preventDefault();

    if (this.state.name !== '') {
      // console.log(this.state.name);
      this.props.createNewGame(this.state.name);
    }
  }


  render() {
    return (
      <div>
        <form onSubmit={this.submitInput}>
          <label>
            Game Name
            <input type="text" onChange={e => this.handleName(e)} name="Game Name" />
          </label>
          <input type="submit" value="Create Game" />
        </form>

      </div>
    );
  }
}
