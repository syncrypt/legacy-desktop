import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './LoginPage.css';
import { Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import rest from '../api'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.loginError = this.loginError.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.state = {
      errors: []
    };
  }

  login() {
    this.setState({errors: []})
    this.props.dispatch(
      rest.actions.login(
        {},
        {
          body: JSON.stringify({
            email: this.formVal("email"),
            password: this.formVal("password")
          })
        },
        this.loginError
      )
    );
  }

  loginError(err, data) {
    if (err) {
      this.setState({
        errors: this.state.errors.concat("Syncrypt Daemon Error")
      })
    } else {
      if (data.status == "ok") {
        this.props.history.push("/main")
      }
      else {
        this.setState({
          errors: this.state.errors.concat(data.text)
        })
      }
    }
  }

  formVal(name) {
    return ReactDOM.findDOMNode(this.refs[name]).value
  }

  enterPressed(event) {
    if (event.keyCode == 13) {
      return this.login();
    }
  }

  render() {
    return (
      <div>
        <h1>Syncrypt Login</h1>
        <form>
          <FormGroup controlId="formBasicText">
            {this.state.errors.map((e, i) => <div key={i} className="loginError">Login failed: {e}</div>)}
            <ControlLabel>Email</ControlLabel>
            <FormControl ref="email" type="text" placeholder="Email" />
            <ControlLabel>Password</ControlLabel>
            <FormControl ref="password" type="password" placeholder="Password" onKeyDown={this.enterPressed} />
            <Button bsStyle="primary" onClick={this.login}>Login</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default connect()(LoginPage);
