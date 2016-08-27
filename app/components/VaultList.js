import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Col, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { shell, remote } from 'electron';
import { connect } from 'react-redux';
import SyncryptComponent from './SyncryptComponent';
import rest from '../api';

import './VaultList.global.css';


class VaultItem extends Component {
  static propTypes = {
    vault: PropTypes.object.isRequired
  };

  showFolder() {
    shell.openItem(this.props.vault.folder);
  }

  render() {
    const { vault } = this.props;
    return (
      <Col className="card vault-card" sm={4}>
        <div className="vaulticon"></div>
        <div className="vaultinfo">
            <h2>{vault.id} <Badge>{vault.state}</Badge></h2>
            {vault.folder}, {vault.user_count} user(s)
            <Button onClick={() => this.showFolder()}>Show files</Button>
        </div>
      </Col>
    );
  }
}

class NewVaultItem extends Component {
  /* Just shows a empty vault with a "+" button */
  render() {
    const { vault } = this.props;
    return (
      <Col className="card vault-card new-vault-card" sm={4} {...this.props}>
        <div className="vault-plus">+</div>
      </Col>
    );
  }
}

class VaultList extends SyncryptComponent {
  static propTypes = {
    vaults: PropTypes.array.isRequired
  };

  constructor() {
      super()
      this.bindFunctions(["addNewVault", "addNewVaultCallback"]);
  }

  addNewVault() {
    var folders = remote.dialog.showOpenDialog({properties: ['openDirectory']});
    if (folders.length > 0) {
      this.props.dispatch(
        rest.actions.vaults.post(
          {},
          { body: JSON.stringify({ folder: folders[0] }) },
          this.addNewVaultCallback
        )
    );
    }
  }

  addNewVaultCallback(err, data) {
    this.props.dispatch(rest.actions.vaults());
  }

  render() {
    return (
      <div>
        <Grid>
          {this.props.vaults.map(v => <VaultItem key={v.id} vault={v} />)}
          <NewVaultItem onClick={this.addNewVault} />
        </Grid>
      </div>
    );
  }
}

export default connect()(VaultList)
