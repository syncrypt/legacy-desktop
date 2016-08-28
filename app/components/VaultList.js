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
      <div className="card vault-card">
        <div className="vault-icon"></div>
        <div className="vault-title">{vault.id}</div>
        <div className="vault-users">{vault.user_count}</div>
        <div className="vault-activity">5 GB <Button onClick={() => this.showFolder()}>Show files</Button>
</div>
      </div>
    );
  }
}

class NewVaultItem extends Component {
  /* Just shows a empty vault with a "+" button */
  render() {
    const { vault } = this.props;
    return (
      <div className="card vault-card new-vault-card" xs={4} {...this.props}>
        <div className="vault-plus"></div>
      </div>
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
        <div className="vault-list">
          <NewVaultItem onClick={this.addNewVault} />
          {this.props.vaults.map(v => <VaultItem key={v.id} vault={v} />)}
        </div>
    );
  }
}

export default connect()(VaultList)
