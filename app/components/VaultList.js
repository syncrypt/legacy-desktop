import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Col, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { shell, remote } from 'electron';
import { connect } from 'react-redux';
import SyncryptComponent from './SyncryptComponent';
import VaultIcon from './VaultIcon';
import rest from '../api';
import { addVault, cloneVault, removeVault } from '../actions';
import fs from 'fs';
import './VaultList.css';

class VaultItem extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["clickedItem", "openVaultFolder"]);
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

  openVaultFolder() {
    if (process.platform === 'darwin') {
      shell.openExternal("file://" + this.props.vault.folder);
    } else {
      shell.openItem(this.props.vault.folder);
    }
  }

  syncStatusClassName(state) {
    if(state === "syncing") {
      return "vault-status-syncing"
    } else {
      return "vault-status-synced"
    }
  }

  render() {
    const { vault, state } = this.props;
    var syncStateClass = "vault-status-synced";
    if(state === "syncing") {
       syncStateClass = "vault-status-syncing"
    }

    return (
      <div className={this.className()} onClick={this.clickedItem}>
        <VaultIcon vault={vault} />
        <div className="vault-info">
          <div className="vault-title">{vault.metadata.name || vault.id}</div>
          <hr/>
          <div className="vault-updated-at">
            <div className={syncStateClass}></div>
            {vault.updated_at || "Last updated 2 hours ago"}
          </div>
          <div className="footer-vault">
            <div className="vault-activity">{vault.size || "?"}</div>
            <div className="vault-users">{vault.user_count || 0}</div>
          </div>
        </div>
        <div className="vault-remove-button" onClick={this.props.onRemoveClick}></div>
        <div className="vault-folder-button" onClick={this.openVaultFolder}></div>
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
        <div className="vault-info">
          <div className="vault-title">{vault.metadata && vault.metadata.name || vault.id}</div>
          <hr/>
          <div className="vault-updated-at">{vault.updated_at || "Last updated 2 hours ago"}</div>
          <div className="footer-vault">
            <div className="vault-activity">{vault.size || "?"}</div>
            <div className="vault-users">{vault.user_count || 0}</div>
          </div>
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
      <div className="vault-plus">
        <div className="vault-plus-icon" {...this.props}></div>
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
    this.bindFunctions(["addNewVault", "performCloneVault"]);
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
          if(confirm(`You selected a folder that isn't a vault yet.\nCreating a new vault from this directory will upload all files (${files.length}) currently inside it.`)) {
            this.performAddNewVault(folder)
          }
        } else {
          this.performAddNewVault(folder)
        }
      })
    }
  }

  performAddNewVault(folder) {
    this.props.dispatch(addVault(folder))
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

  removeVault(vault) {
    this.props.dispatch(removeVault(vault))
  }

  flyingVaultList() {
    if(this.props.flyingVaults.length == 0) {
      return <div></div>;
    }
    return(
      <div>
        <hr className="flying-vault-seperator" />
        <div className="flying-vault-info">
          <span className="title">Available vaults on Server</span>
          <span className="subtitle">Click to clone to your computer</span>
        </div>
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

  render() {
    return (
      <div className="vault-list">
        {
          this.props.vaults.map(v =>
            <VaultItem
              key={v.id}
              vault={v}
              state={this.props.vaultStates[v.resource_uri]}
              selected={this.props.selectedVault && v.id === this.props.selectedVault.id || false}
              onClick={() => this.props.onVaultSelect(
                  (this.props.selectedVault && v.id === this.props.selectedVault.id) ? null : v)}
              onRemoveClick={() => this.removeVault(v)}
            />
          )
        }
        <NewVaultItem onClick={this.addNewVault} />
        {this.flyingVaultList()}
      </div>
    );
  }
}

export default connect(({ stats }) => {
  return {
    vaultStates: stats.data.states || {}
  }
})(VaultList)
