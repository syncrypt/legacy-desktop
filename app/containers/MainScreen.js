import React, { PropTypes } from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import './MainScreen.global.css';
import VaultList from '../components/VaultList';
import rest from '../api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Grid, Row } from 'react-bootstrap';

class MainScreen extends SyncryptComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.bindFunctions(["logout"]);
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

  render() {
    const {vaults, stats} = this.props;
    return (
      <div className="main-screen">
        <div className="main-screen-header">
        <div className="main-screen-stats">{stats.stats} / {stats.downloads} / {stats.uploads}
        <Button onClick={this.logout}>Logout</Button>
      </div>
      </div>
      <Grid>
        <Row>
          <VaultList vaults={vaults} />
        </Row>
      </Grid>
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
