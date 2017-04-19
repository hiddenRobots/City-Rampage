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
    // is the following line still necessary ?
    // const test = (this.state.joined === false && this.state.cont === false && this.state.new === false);
    return (

      <div>
        <h1> Hi Player! </h1>
        <div className="nav-link" onClick={() => { this.props.auth ? this.props.signOut(this.props.auth.uid) : null; }}> Sign Out</div>
      </div>
    );
  }
}

export default Home;
