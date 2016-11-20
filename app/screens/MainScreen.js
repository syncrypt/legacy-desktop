import React, { PropTypes } from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import './MainScreen.css';
import VaultList from '../components/VaultList';
import rest from '../api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Grid, Row, Col } from 'react-bootstrap';
import { hashHistory } from 'react-router';
import * as actions from '../actions';
import IconButton from '../components/IconButton';
import ReactDOM from 'react-dom';

import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import PerfectScrollbar from 'perfect-scrollbar';

class Header extends SyncryptComponent {
  render() {
    const {vaults, stats} = this.props;
    return (
      <div className="main-screen-header">
        <div className="main-screen-buttons">
          <IconButton icon="settings" onClick={this.props.onSettingsClick} />
          <IconButton icon="logout" onClick={this.props.onLogoutClick} />
        </div>
      </div>
    );
  }
}

class Footer extends SyncryptComponent {
  render() {
    const {vaults, stats} = this.props;
    return (
      <div className="main-screen-footer">
        {vaults.length} Vault(s) / {stats.stats} / {stats.downloads} / {stats.uploads}
      </div>
    );
  }
}

class MainScreen extends SyncryptComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.bindFunctions(["openAccountSettings"]);
  }

  className() {
    if (this.props.sidebarHidden) {
      return "main-screen expanded";
    } else {
      return "main-screen";
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(rest.actions.stats.sync());
    dispatch(rest.actions.user.sync());
    dispatch(rest.actions.vaults.sync());
    dispatch(rest.actions.flyingvaults.sync());
    dispatch(rest.actions.version())

    var container = ReactDOM.findDOMNode(this.refs.container);
    PerfectScrollbar.initialize(container);
  }

  openAccountSettings() {
    alert("Coming soon.");
  }

  render() {
    const {vaults, flyingVaults, stats } = this.props;

    let boundActions = bindActionCreators(actions, this.props.dispatch);

    return (
      <div>
        <div className={this.className()}>
          <Header stats={stats}
                  onLogoutClick={boundActions.logout}
                  onSettingsClick={this.openAccountSettings} />
          <Grid ref="container">
            <Row>
              <VaultList
                vaults={vaults}
                flyingVaults={flyingVaults}
                selectedVault={this.props.selectedVault}
                onVaultSelect={boundActions.selectVault} />
            </Row>
          </Grid>
        </div>
        { this.props.sidebar }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { vaults, flyingvaults, navigation } = state;

  // Remove all cloned vaults from flyingvaults...
  let clonedVaults = vaults.data || []
  let clonedVaultIds = clonedVaults.map((v) => v.id);
  let flyingVaults = (flyingvaults.data || []).filter((fv) => !clonedVaultIds.includes(fv.id))

  return {
    selectedVault: navigation.selected_vault_id ? (vaults.data || [])
            .filter((v) => v.id == navigation.selected_vault_id)[0] : null,
    sidebarHidden: navigation.sidebarHidden,
    vaults: clonedVaults,
    flyingVaults: flyingVaults,
    stats: state.stats.sync ? state.stats.data.stats : {}
  };
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
