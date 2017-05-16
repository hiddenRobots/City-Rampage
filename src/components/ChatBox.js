import React, { Component } from 'react';

import '../assets/ChatBox.css';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
    };
  }

  updateTextInput(e) {
    e.preventDefault();
    this.setState({ textInput: e.target.value });
  }

  sendMessage(e) {
    e.preventDefault();
    if (this.state.textInput.trim().length) {
      this.props.sendMessage({
        id: this.props.auth.uid,
        text: this.state.textInput.trim(),
      });
      this.setState({ textInput: '' });
    }
  }

  generatePlayersInfo(playerData, playerOrder) {
    // uses playerOrder to determine username color in the chat
    const PLAYER_COLORS = ['#7bb233', '#5cbfc4', '#a97cc1', '#d1af66'];

    const playersInfo = {};
    for (const playerID in playerData) {
      playersInfo[playerID] = {
        name: playerData[playerID].displayName,
        color: playerOrder ? PLAYER_COLORS[playerOrder.indexOf(playerID)] : '#000',
      };
    }
    return playersInfo;
  }

  renderMessages(messages, playersInfo) {
    return [...Object.keys(messages)].filter(x => x != 0).reverse().map((hash, index) => {
      const playerInfo = playersInfo[messages[hash].id] || { name: 'default', color: 'red' };
      return (
        <div
          key={index}
          className="message"
        >
          <span style={{ color: playerInfo.color }}>{`${playerInfo.name}:  `}</span>
          {messages[hash].text}
          <br />
        </div>);
    });
  }

  render() {
    const {
      messages,
      playerOrder,
      auth,
    } = this.props;

    const playersInfo = this.generatePlayersInfo(this.props.players, this.props.playerOrder);


    return (

      <div
        className="chat-box"
      >
        <form>
          <input
            type="submit" value="send" className="chatboxButton"
            onClick={this.sendMessage.bind(this)}
          />
          <input
            type="text"
            className="chatboxInput"
            onChange={this.updateTextInput.bind(this)} value={this.state.textInput}
          />

        </form>
        <div
          className="messages"
        >
          {this.renderMessages(messages, playersInfo)}
        </div>
      </div>);
  }
}


export default ChatBox;
