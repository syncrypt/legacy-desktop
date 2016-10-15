import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import './VaultSettingsBar.css';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { shell } from 'electron';
import SyncryptComponent from './SyncryptComponent';
import rest from '../api';
import { addVaultUser, refreshUserKeys, setVaultMetadata, deleteVault, removeVault } from '../actions';

import AddUserDialog from './AddUserDialog';
import UserIcon from './UserIcon';

class VaultSettingsBar extends SyncryptComponent {
  static propTypes = {
    vault: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.bindFunctions([
      "addUser", "openVaultFolder", "onAddUserClose", "onAddUserKeyDown",
      "editName", "editNameKeyPressed", "deleteVault", "removeVault"
    ]);
    this.state = { showAddDialog: false, addDialogUser: null, editName: false }
  }

  addUser() {
    let email = this.getFormValueByRef('email');
    this.props.dispatch(refreshUserKeys(email));
    this.setState({
      showAddDialog: true,
      addDialogEmail: email
    })
  }

  onAddUserClose() {
    ReactDOM.findDOMNode(this.refs.email).value = "";
    this.setState({
      showAddDialog: false,
      addDialogEmail: null
    })
  }

  onAddUserKeyDown(event) {
    if (event.keyCode == 13) {
      this.addUser();
    }
  }

  editName() {
    this.setState({
      editName: true
    })
    ReactDOM.findDOMNode(this.refs.vaultName).value = this.props.vault.metadata.name;
    ReactDOM.findDOMNode(this.refs.vaultName).focus();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.vault.id !== this.props.vault.id) {
      this.setState({
        editName: false
      })
    }
  }

  removeVault() {
    this.props.dispatch(removeVault(this.props.vault))
  }


  deleteVault() {
    this.props.dispatch(deleteVault(this.props.vault))
  }

  editNameKeyPressed(e) {
    if (e.key === 'Enter') {
      this.props.dispatch(
        setVaultMetadata(
          this.props.vault,
          Object.assign({},
            this.props.vault.metadata,
            { name: this.getFormValueByRef("vaultName") }
          )
        )
      )
      this.setState({
        editName: false
      })
    }
  }

  openVaultFolder() {
    if (process.platform === 'darwin') {
      shell.openExternal("file://" + this.props.vault.folder);
    } else {
      shell.openItem(this.props.vault.folder);
    }
  }

  render() {
    const { vault } = this.props;
    const header =
      <div className="vault-settings-header">
        <FormControl ref="vaultName"
                     type="text"
                     style={{'display': this.state.editName ? 'block' : 'none'}}
                     className="vault-name-edit"
                     autoFocus={true}
                     onKeyPress={this.editNameKeyPressed} />
        <span className="vault-name"
              style={{'display': this.state.editName ? 'none' : 'block'}}
              onDoubleClick={this.editName}>
          {vault.metadata.name || vault.id}
        </span>
      </div>;
    return <Sidebar header={header}>
      <div>
        <div className="user-invite">
          <div className="add-user">
            <form>
              <h2>Invite Users</h2>
              <span>
                <div className="user-plus" onClick={this.addUser}></div>
                <FormControl ref="email" className="email-input" type="text" placeholder="Email" onKeyDown={this.onAddUserKeyDown}  />
              </span>
            </form>
          </div>
        </div>

        <div className="member-list">
          <table>
            <tr>
              <th></th>
              <th className="name"><h2>Members</h2></th>
              <th className="other">Joined</th>
            </tr>

            {
              this.props.vault_members.map((user, i) =>
                <tr key={i} className="vault-member">
                  <td>
                    <UserIcon email={user.email} />
                  </td>
                  <td className="name">
                    {user.name} <span className="email">{user.email}</span>
                  </td>
                  <td className="other">{user.join_date}</td>
                </tr>
              )
            }
          </table>
        </div>

        <Button onClick={this.openVaultFolder}>Open Vault Folder</Button>
        <Button onClick={this.removeVault}>Remove this vault</Button>
        <Button onClick={this.deleteVault}>DELETE this vault</Button>

        </div>
        <AddUserDialog vault={vault} show={this.state.showAddDialog} onClose={this.onAddUserClose} email={this.state.addDialogEmail || ""} />
    </Sidebar>
  }
}

function mapStateToProps(state, ownProps) {
  const { routeParams } = ownProps;
  const { vaults, vaultusers } = state;
  return {
    vault: vaults.data.filter((v) => v.id == routeParams.vault_id)[0],
    vault_members: (vaultusers.data || []).map((vu) =>
      ({
        email: vu.email,
        name: vu.first_name + " " + vu.last_name,
        join_date: vu.access_granted_at
      }))
  };
}

export default connect(mapStateToProps)(VaultSettingsBar);
