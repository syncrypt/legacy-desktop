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
import ReactDOM from 'react-dom';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import PerfectScrollbar from 'perfect-scrollbar';
import Collapsible from 'react-collapsible';

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

  componentDidMount() {
    var container = ReactDOM.findDOMNode(this.refs.welcomeSidebar);
    console.log("sidebar: ", container)
    PerfectScrollbar.initialize(container);
  }

  render() {
    let { openFeedbackSideBar } = bindActionCreators(actions, this.props.dispatch);

    const { account, version } = this.props;
    const header = <div className="account-settings-header">
      Syncrypt Alpha
    </div>;

    return(
      <Sidebar header={header}>
        <div className="welcome-sidebar" ref="welcomeSidebar">
          <h1>Welcome, {this.props.user.first_name}!</h1>
          <h2>
            Thanks for using the Alpha version of Syncrypt.
          </h2>
          <p>
            As much as we'd like to give you a hassle-free experience, at this
            early stage you'll almost certainly run into issues with this
            program. We appreciate any kind of feedback, including bug reports
            and ideas for UI/UX improvement.
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

          <Collapsible trigger="User Interface Help ▼" triggerWhenOpen="User Interface Help ▲">
            <div className="help-text">
              <p>
                You can start creating new vaults (or adding existing vaults you
                have created before) by clicking on the <span className="plus-icon-inline"></span> button on the left.
                <br/>
                Once you've added vaults, you can inspect their details by clicking
                on the vault card. A vault specific sidebar will open and will show
                you the users that have access to it. You can also add users to a
                vault there.
              </p>
              <p>
                When adding a user to a vault, you will be prompted to select the
                user's keys you want to give access to. We create a cryptographic
                key pair for every device a user uses syncrypt on.
                By default all of the user's keys will be added to the vault.
              </p>
              <p>
                To the bottom you will see any vaults you have been invited to that
                you currently don't have downloaded to your computer. You can
                download them by clicking on their semi-transparent card and choose
                a destination to save the vault to.
              </p>
            </div>
          </Collapsible>

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
