import React from 'react';
import Sidebar from './Sidebar';
import SyncryptComponent from './SyncryptComponent';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { shell } from 'electron';
import { openAccountSettings } from '../actions';
import './WelcomeSidebar.css';
import IconButton from './IconButton';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import rest from '../api';

class WelcomeSidebar extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["checkForUpdates"]);
  }

  checkForUpdates() {
    this.props.dispatch(rest.actions.version())
  }

  openReleasesDownload() {
    shell.openExternal("https://alpha.syncrypt.space/releases/");
  }

  render() {
    let { openFeedbackSideBar } = bindActionCreators(actions, this.props.dispatch);

    const { account, version } = this.props;
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
                          onClick={openFeedbackSideBar} />
            </li>
          </ul>
          { !this.props.loadingVersion ? (version.update_available ?
            <div>
              <p>
                Running version {version.installed_version}.<br/>
                An update is available to version {version.available_version}!
              </p>
              <ul>
                <li>
                  <IconButton icon="download"
                              text="Download"
                              onClick={this.openReleasesDownload} />
                </li>
              </ul>
            </div>
            :
            <div>
              <ul>
                <li>
                  <IconButton icon="update"
                              text="Check for updates"
                              onClick={this.checkForUpdates} />
                </li>
              </ul>
              <p>
                The installed version is up to date.
              </p>
            </div> ) : <p>Checking for latest version...</p>
          }
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    version: state.version.data,
    loadingVersion: state.version.loading
  };
}

export default connect(mapStateToProps)(WelcomeSidebar);
