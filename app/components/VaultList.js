import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Col, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { shell, remote } from 'electron';
import { connect } from 'react-redux';
import SyncryptComponent from './SyncryptComponent';
import VaultIcon from './VaultIcon';
import rest from '../api';
import { cloneVault } from '../actions';
import fs from 'fs';
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
    const { vault, state } = this.props;
    return (
      <div className={this.className()} onClick={this.clickedItem}>
        <VaultIcon vault={vault} />
        <div className="vault-title">{vault.metadata.name || vault.id} ({state})</div>
        <div className="footer-vault">
          <div className="vault-users">{vault.user_count}</div>
          <div className="vault-activity">{vault.size || "? GB"}</div>
        </div>
      </div>
    );
  }
}

class FlyingVaultItem extends SyncryptComponent {
  static propTypes = {
    vault: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { vault } = this.props;
    return (
      <div className="card flying-vault-card" onClick={this.props.onClick}>
        <VaultIcon vault={vault} />
        <div className="vault-title">{vault.metadata && vault.metadata.name || vault.id}</div>
      </div>
    );
  }
}

class NewVaultItem extends Component {
  /* Just shows a empty vault with a "+" button */
  render() {
    const { vault } = this.props;
    return (
      <div className="card new-vault-card" {...this.props}>
        <div className="vault-plus"></div>
      </div>
    );
  }
}

const IGNORE_FILES = [".DS_Store", ".vault"];

class VaultList extends SyncryptComponent {
  static propTypes = {
    vaults: PropTypes.array.isRequired,
    onVaultSelect: PropTypes.func.isRequired
  };

  constructor() {
    super()
    this.bindFunctions(["addNewVault", "addNewVaultCallback", "performCloneVault"]);
  }

  addNewVault() {
    var folders = remote.dialog.showOpenDialog({properties: ['openDirectory']});
    if (folders.length > 0) {
      var folder = folders[0];
      fs.readdir(folder, (err, files) => {
        // if the folder is already a vault, simply add it
        if(files.includes(".vault")) {
          return this.performAddNewVault(folder)
        }

        files = files.filter((f) => !IGNORE_FILES.includes(f))
        // if we have existing files in directory to be added and it's not a vault,
        // confirm with user before creating vault & uploading files to server.
        if(files.length > 0) {
          if(confirm(`Creating a new vault from this directory will upload all files (${files.length}) currently inside it.`)) {
            this.performAddNewVault(folder)
          }
        } else {
          this.performAddNewVault(folder)
        }
      })
    }
  }

  performAddNewVault(folder) {
    this.props.dispatch(
      rest.actions.vaults.post(
        {},
        { body: JSON.stringify({ folder: folder }) },
        this.addNewVaultCallback
      )
    );
  }

  performCloneVault(vault) {
    var folders = remote.dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      buttonLabel: "Clone into this directory"
    });

    if (folders && folders.length == 1) {
      this.props.dispatch(cloneVault(vault, folders[0], (err) => {
        if(err) {
          alert("Folder is not empty. Please create a new directory instead.")
          return this.performCloneVault(vault);
        }
      }))
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
              state={this.props.vaultStates[v.resource_uri]}
              selected={this.props.selectedVault && v.id === this.props.selectedVault.id || false}
              onClick={() => this.props.onVaultSelect(
                  (this.props.selectedVault && v.id === this.props.selectedVault.id) ? null : v)}
            />
          )
        }
        {
          this.props.flyingVaults.map(v =>
            <FlyingVaultItem
              key={v.id}
              vault={v}
              selected={this.props.selectedVault && v.id === this.props.selectedVault.id || false}
              onClick={() => this.performCloneVault(v)}
            />
          )
        }
      </div>
    );
  }
}

export default connect(({ stats }) => {
  return {
    vaultStates: stats.data.states || {}
  }
})(VaultList)
