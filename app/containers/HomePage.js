import React, { Component, PropTypes } from 'react';
import styles from './HomePage.css';
import VaultList from '../components/VaultList';
import rest from '../api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Grid, Row } from 'react-bootstrap';

class HomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(rest.actions.stats.sync());
    dispatch(rest.actions.vaults.sync());
  }

  render() {
    const {vaults, stats} = this.props;
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.stats}>{stats.stats} STATs, {stats.downloads} DOWNLOADs, {stats.uploads} UPLOADs</div>
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
    counter: state.counter,
    vaults: state.vaults.data,
    stats: state.stats.sync ? state.stats.data.stats : {}
  };
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
