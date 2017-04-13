import React from 'react';

export default class KickKing extends React.Component {
  render() {
    // console.log('kick king props', this.props);
    return (
      <div>

        <div>
        You are being attack do you want to leave the city?
        <button onClick={() => this.props.setKing()}>Yes</button>
          <button>No</button>
        </div>


      </div>
    );
  }
}
