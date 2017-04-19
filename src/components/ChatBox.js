import React, { Component } from 'react'

class ChatBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      textInput: ''
    }
  }

  updateTextInput(e) {
    e.preventDefault()
    this.setState({ textInput: e.target.value })
  }

  sendMessage(e) {
    e.preventDefault()
    if (this.state.textInput.trim().length){
      this.props.sendMessage({ 
        id: this.props.auth.uid,
        text: this.state.textInput.trim()
      })
      this.setState({ textInput: '' })      
    }
  }

  generatePlayersInfo(playerData, playerOrder) {
    
    //uses playerOrder to determine username color in the chat
    const PLAYER_COLORS = ['#7bb233', '#5cbfc4', '#a97cc1', '#d1af66']

    let playersInfo = {}
    for (let playerID in playerData) {
      playersInfo[playerID] = {
        name: playerData[playerID].displayName,
        color: PLAYER_COLORS[playerOrder.indexOf(playerID)] || '#000'
      }
    }
    return playersInfo
  }

  renderMessages(messages, playersInfo){

    return [...Object.keys(messages)].filter(x=>x!=0).reverse().map(hash=>{
      let playerInfo = playersInfo[messages[hash].id] || { name: 'default', color: 'red' }
      return (
      <div className="message" style = {{ 
        borderRadius: '10px', 
        backgroundColor:'#fff',
        padding: '5px',
        margin: '5px',
        boxShadow: 'grey -1px 3px 10px',
        overflowX: 'hidden'
      }}>
        <span style={{ color:playerInfo.color }}>{playerInfo.name + ':  '}</span>
        {messages[hash].text}
        <br />
      </div>)
      })
  }

  render(){

    const {
      messages,
      playerOrder,
      auth
    } = this.props;

    const playersInfo = this.generatePlayersInfo(this.props.players, this.props.playerOrder)


    return (
      <div className="chat-box" style={{ 
        margin: '20px',
        backgroundColor: '#e8eff4',
        borderRadius: '10px',
        padding: '12px 15px 20px 20px'
      }}>
        <form>
          <input type="submit" value="send" style={{
            height: '30px',
            width: '100px',
            background: '#fff',
            color: '#6aa8d1',
            border: '5px solid #6aa8d1',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '18px'
          }} 
          onClick={ this.sendMessage.bind(this) }/>
          <input type="text" style={{
            height: '20px',
            fontSize: '15px',
            borderRadius: '5px',
            marginLeft: '10px',
            width: '70%'
          }} onChange={ this.updateTextInput.bind(this) } value={ this.state.textInput }/>
        </form>
        <div className = "messages" style = {{
          width: '86%', 
          height: 150, 
          overflow: 'auto', 
          paddingLeft: '0px 15px',
          backgroundColor: '#eff2f4',
          borderRadius: '10px',
          marginTop: '15px',
          fontSize: '14px'
        }}>
        {this.renderMessages(messages, playersInfo)}
        </div>
      </div>)
  }
}









export default ChatBox