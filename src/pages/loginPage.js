import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }
  state = {};
  click(event) {
    event.preventDefault();
    console.log('Yeah stop clicking button not working yet');
    return;
  }
  style = {
    backgroundColor: 'sky-blue',
    color: 'black',
    padding: '7px 9px',
    marginLeft: '80%',
    border: 'none'
  };
  input = {
    width: '100%',
    border: '1px solid #333',
    height: '2em'
  };
  label = {
    width: '50%',
    height: '2em'
  };
  render() {
    return (
      <>
        <Link to="/">
          <button type="button" style={this.style}>
            Home
          </button>
        </Link>
        <form>
          <label style={this.label}>Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            style={this.input}
          />
          <label style={this.label}>Password</label>
          <input type="password" placeholder="......." style={this.input} />
          <input
            type="submit"
            value="login"
            onClick={this.click}
            style={this.style}
          />
        </form>
      </>
    );
  }
}

export default LoginPage;
