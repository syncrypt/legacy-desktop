import React from 'react';
import Sidebar from './Sidebar';
import './AccountSettingsBar.css';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';

class AccountSettingsBar extends Sidebar {
  constructor(props) {
    super(props);
    this.bindFunctions(["updateAccount"]);
  }

  updateAccount() {
    alert("TODO");
  }

  render() {
    const { account } = this.props;

    this.setHeader(
      <div className="account-settings-header">
        Account Settings
      </div>
    );

    return super.render(
      <div className="account-settings">
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>First Name</ControlLabel>
            <FormControl ref="first-name" type="text" placeholder="" value={account.first_name}/>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl ref="last-name" type="text" placeholder="" value={account.last_name}/>
            <ControlLabel>Email</ControlLabel>
            <FormControl ref="email" type="text" placeholder="Email" value={account.email}/>
            <ControlLabel>Current Password</ControlLabel>
            <FormControl ref="current-password" type="password" placeholder="Current Password" />
            <ControlLabel>New Password</ControlLabel>
            <FormControl ref="password" type="password" placeholder="Password" />
            <ControlLabel>New Password Confirmation</ControlLabel>
            <FormControl ref="password-confirmation" type="password" placeholder="Password (confirm)" />
            <Button bsStyle="primary" onClick={this.updateAccount}>Update Account</Button>
            {
              this.state.errors.map((e, i) =>
                <div key={i} className="account-error">
                  Update failed: {e}
                </div>
              )
            }
          </FormGroup>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: {
      email: "chris@syncrypt.space",
      first_name: "Christopher",
      last_name: "Bertels"
    }
  };
}

export default connect(mapStateToProps)(AccountSettingsBar);
