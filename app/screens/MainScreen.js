import React, { PropTypes } from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import './MainScreen.css';
import VaultList from '../components/VaultList';
import rest from '../api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Grid, Row, Col } from 'react-bootstrap';
import VaultSettingsBar from '../components/VaultSettingsBar';
import AccountSettingsBar from '../components/AccountSettingsBar';
import { hashHistory } from 'react-router';
import * as actions from '../actions';

class Header extends SyncryptComponent {
  render() {
    const {vaults, stats} = this.props;
    return (
      <div className="main-screen-header">
        <div className="main-screen-stats">
          <Button onClick={this.props.onLogoutClick}>Logout</Button>
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
  }

  render() {
    const {vaults, flyingVaults, stats } = this.props;

    let boundActions = bindActionCreators(actions, this.props.dispatch);

    return (
      <div>
        <div className={this.className()}>
          <Header stats={stats} onLogoutClick={boundActions.logout} />
          <Grid>
            <Row>
              <VaultList
                vaults={vaults}
                flyingVaults={flyingVaults}
                selectedVault={this.props.selectedVault}
                onVaultSelect={boundActions.selectVault} />
            </Row>
          </Grid>
          <Footer vaults={vaults} stats={stats} />
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
