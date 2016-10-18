import React from 'react';
import Sidebar from './Sidebar';
import SyncryptComponent from './SyncryptComponent';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openAccountSettings } from '../actions';
import './WelcomeSidebar.css';
import IconButton from './IconButton';

class WelcomeSidebar extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["openFeedbackDialog", "checkForUpdates"]);
  }

  openFeedbackDialog() {
    alert("Coming soon.")
  }

  checkForUpdates() {
    alert("Coming soon.")
  }

  render() {
    const { account } = this.props;
    const header = <div className="account-settings-header">
      Syncrypt Alpha
    </div>;

    return(
      <Sidebar header={header}>
        <div className="welcome-sidebar">
          <h1>Welcome, {this.props.user.first_name}!</h1>
          <h2>
            Thanks for using the Alpha version of Syncrypt.
          </h2>
          <p>
            As much as we would like to give you a hassle free experience,
            in this early stage you almost certainly will run into issues
            with this program. We appreciate any kind of feedback, including
            bug reports and ideas for UI/UX improvement.
          </p>
          <ul>
            <li>
              <IconButton icon="feedback"
                          text="Give Feedback"
                          onClick={this.openFeedbackDialog} />
            </li>
            <li>
              <IconButton icon="update"
                          text="Check for updates"
                          onClick={this.checkForUpdates} />
            </li>
          </ul>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data
  };
}

export default connect(mapStateToProps)(WelcomeSidebar);
