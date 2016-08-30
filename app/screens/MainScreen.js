import React, { PropTypes } from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import './MainScreen.css';
import VaultList from '../components/VaultList';
import rest from '../api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Grid, Row, Col } from 'react-bootstrap';

class Header extends SyncryptComponent {
  render() {
    const {vaults, stats} = this.props;
    return (<div className="main-screen-header">
        <div className="main-screen-stats">
          <Button onClick={this.props.onLogoutClick}>Logout</Button>
        </div>
      </div>)
  }
}

class Footer extends SyncryptComponent {
  render() {
    const {vaults, stats} = this.props;
    return (
      <div className="main-screen-footer">
        {vaults.length} Vault(s) / {stats.stats} / {stats.downloads} / {stats.uploads}
      </div>
    )
  }
}

class MainScreen extends SyncryptComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.bindFunctions(["logout", "onToggleSidebar"]);
    this.state = {
      sidebarHidden: false,
      className: "main-screen"
    };
  }

  className() {
    if(this.state.sidebarHidden) {
      return "main-screen expanded";
    } else {
      return "main-screen";
    }
  }

  logout() {
    this.props.dispatch(rest.actions.auth.logout((err, data) => {
        this.props.history.push('/');
    }));
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(rest.actions.stats.sync());
    dispatch(rest.actions.vaults.sync());
  }

  onToggleSidebar(hidden) {
    this.setState({sidebarHidden: hidden});
  }

  render() {
    const {vaults, stats, vault_members} = this.props;
    const Sidebar = this.props.sidebar.type;
    return (
      <div>
        <div className={this.className()}>
          <Header stats={stats} onLogoutClick={this.logout} />
          <Grid>
            <Row>
              <VaultList vaults={vaults} />
            </Row>
          </Grid>
          <Footer vaults={vaults} stats={stats} onLogoutClick={this.logout} />
        </div>
        <Sidebar onToggle={this.onToggleSidebar}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    vaults: state.vaults.data,
    stats: state.stats.sync ? state.stats.data.stats : {}
  };
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
