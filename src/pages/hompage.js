import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  state = {};
  style = {
    backgroundColor: 'red',
    color: 'white',
    padding: '7px 9px',
    marginLeft: '40%',
    border: 'none'
  };
  render() {
    return (
      <>
        <h1>Welcome to ErrorSwag, what on your mind?</h1>
        <img src="../../public/images/logo.png" alt="errorswag logo" />
        <Link to="/login">
          <button type="button" style={this.style}>
            Login
          </button>
        </Link>
      </>
    );
  }
}

export default Homepage;
