import React from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './LoginScreen.css';
import { Grid, Row, Col, Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
import { hashHistory } from 'react-router';
import rest from '../api'


class LoginScreen extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["login", "loginError", "enterPressed"])
    this.state = {
      errors: []
    };
  }

  login() {
    this.setState({errors: []})
    this.props.dispatch(
      rest.actions.auth.login(this.getFormValueByRef("email"), this.getFormValueByRef("password"), this.loginError)
    );
  }

  loginError(err, data) {
    if (err) {
      this.setState({
        errors: this.state.errors.concat("Syncrypt Daemon Error")
      })
    } else {
      if (data.status == "ok") {
        hashHistory.push("/main")
      } else {
        this.setState({
          errors: this.state.errors.concat(data.text)
        })
      }
    }
  }

  enterPressed(event) {
    if (event.keyCode == 13) {
      return this.login();
    }
  }

  render() {
    return (
      <Grid className="login-screen">
        <div className="login-content">
            <img className="login-header-logo" src="./assets/logo.png"/>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Email</ControlLabel>
                <FormControl ref="email" type="text" placeholder="Email" />
                <ControlLabel>Password</ControlLabel>
                <FormControl ref="password" type="password" placeholder="Password" onKeyDown={this.enterPressed} />
                <Button bsStyle="primary" onClick={this.login}>Login</Button>
                {
                  this.state.errors.map((e, i) =>
                    <div key={i} className="loginError">
                      Login failed: {e}
                    </div>
                  )
                }
              </FormGroup>
            </form>
        </div>
      </Grid>
    );
  }
}

export default connect()(LoginScreen);
