import React from 'react';
import Sidebar from './Sidebar';
import SyncryptComponent from './SyncryptComponent';
import './AccountSettingsBar.css';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';

class AccountSettingsBar extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["updateAccount"]);
    this.state = {
      errors: [],
    };
  }

  updateAccount() {
    alert("TODO");
  }

  render() {
    const { account } = this.props;

    const header = <div className="account-settings-header">
            Account Settings
        </div>;

    return <Sidebar header={header}>
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
      </Sidebar>
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
