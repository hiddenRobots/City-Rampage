import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      cont: false,
      new: false,
    };
  }

  joinedClick() {
    this.setState({ joined: true });
  }

  render() {
    const test = (this.state.joined === false && this.state.cont === false && this.state.new === false);
    return (

      <div>
        <h1> Hi Player! </h1>

        <p><button onClick={() => { this.props.signOut(this.props.auth.uid); }}> Sign Out</button></p>
      </div>
    );
  }
}

export default Home;
