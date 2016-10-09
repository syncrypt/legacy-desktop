import React from 'react';
import Sidebar from './Sidebar';
import SyncryptComponent from './SyncryptComponent';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openAccountSettings } from '../actions';

class WelcomeSidebar extends SyncryptComponent {

  render() {
    const { account } = this.props;

    const header = <div className="account-settings-header">
            Syncrypt Alpha
        </div>;

    return <Sidebar header={header}>
        <div>
            <h2>Welcome, {this.props.account.first_name}!</h2>
            <p>
                Thanks for using the Alpha version of Syncrypt.
            </p>
            <p>
                As much as we would like to give you a hassle free experience,
                in this early stage you almost certainly will run into issues
                with this program. We appreciate any kind of feedback, including
                bug reports and ideas for UI/UX improvement.
            </p>
            <Button class='btn'>Feedback</Button>
            <Button class='btn'>Check for update</Button>
            <Button class='btn' onClick={openAccountSettings}>Account settings</Button>
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

export default connect(mapStateToProps)(WelcomeSidebar);
