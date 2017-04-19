import { connect } from 'react-redux'
import { sendMessage } from '../actions/chatBox'
import chatBoxComponent from '../components/ChatBox'

const mapStateToProps = state => ({
  playerOrder: state.game.playerPosition,
  messages: state.game.messages,
  players: state.game.players,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  sendMessage(...args) { dispatch(sendMessage(...args)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(chatBoxComponent)