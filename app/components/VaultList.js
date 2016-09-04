import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Col, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { shell, remote } from 'electron';
import { connect } from 'react-redux';
import SyncryptComponent from './SyncryptComponent';
import rest from '../api';

import './VaultList.css';

class VaultItem extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["clickedItem"]);
  }

  static propTypes = {
    vault: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  };

  clickedItem() {
    this.props.onClick(this);
  }

  className() {
    if(this.props.selected) {
      return "card vault-card-selected";
    } else {
      return "card vault-card";
    }
  }

  render() {
    const { vault } = this.props;
    return (
      <div className={this.className()} onClick={this.clickedItem}>
        <div className="vault-icon"></div>
        <div className="vault-title">{vault.metadata.name || vault.id}</div>

        <div className="footer-vault">
          <div className="vault-users">{vault.user_count}</div>
          <div className="vault-activity">{vault.size || "? GB"}</div>
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
      <div className="card new-vault-card" xs={4} {...this.props}>
        <div className="vault-plus"></div>
      </div>
    );
  }
}

class VaultList extends SyncryptComponent {
  static propTypes = {
    vaults: PropTypes.array.isRequired,
    onVaultSelect: PropTypes.func.isRequired
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
        {
          this.props.vaults.map(v =>
            <VaultItem
              key={v.id}
              vault={v}
              selected={this.props.selectedVault && v.id === this.props.selectedVault.id || false}
              onClick={() => this.props.onVaultSelect(
                  (this.props.selectedVault && v.id === this.props.selectedVault.id) ? null : v)}
            />
          )
        }
      </div>
    );
  }
}

export default connect()(VaultList)
