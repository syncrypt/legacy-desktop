import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { shell } from 'electron';
import SyncryptComponent from './SyncryptComponent';
import rest from '../api';
import AddUserDialog from './AddUserDialog';
import UserIcon from './UserIcon';
import IconButton from './IconButton';
import { addVaultUser, refreshUserKeys, setVaultMetadata, deleteVault,
    removeVault, removeVaultUser } from '../actions';
import TimeAgo from 'react-timeago';
import './VaultSettingsBar.css';

class VaultSettingsBar extends SyncryptComponent {
  static propTypes = {
    vault: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.bindFunctions([
      "addUser", "openVaultFolder", "onAddUserClose", "onAddUserKeyDown",
      "editName", "editNameKeyPressed", "deleteVault", "removeVault",
      "removeVaultUser"
    ]);
    this.state = { showAddDialog: false, addDialogUser: null, editName: false }
  }

  isVaultOwner() {
    let owner = this.props.vault_members[0];
    if(owner) {
      return this.props.user.email === owner.email;
    }
    return false;
  }

  withOwnerPermissions(fun) {
    if(this.isVaultOwner()) {
      fun()
    } else {
      alert("Permission Denied: You're not the vault owner.")
    }
  }

  addUser() {
    this.withOwnerPermissions(() => {
      let email = this.getFormValueByRef('email').trim();
      if(email != "") {
        this.props.dispatch(refreshUserKeys(email));
        this.setState({
          showAddDialog: true,
          addDialogEmail: email
        })
      }
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
    if(confirm("This will only remove the vault from the active list of vaults on this computer. It won't delete it on the Server.")) {
      this.props.dispatch(removeVault(this.props.vault))
    }
  }

  removeVaultUser(user) {
    let userInfo = ``;
    this.withOwnerPermissions(() => {
      if(confirm(`Remove user\n${user.name} (${user.email})\nfrom vault\n'${this.props.vault.metadata.name}'?`)) {
        this.props.dispatch(removeVaultUser(this.props.vault, user.email))
      }
    })
  }


  deleteVault() {
    this.withOwnerPermissions(() => {
      if(confirm("Do you really want to delete this vault from the server?\nWe won't delete your files locally but you will have to re-upload your vault's files if you want to share or back them up again.")) {
        this.props.dispatch(deleteVault(this.props.vault))
      }
    })
  }

  editNameKeyPressed(e) {
    if (e.key === 'Enter') {
      this.withOwnerPermissions(() => {
        this.props.dispatch(
          setVaultMetadata(
            this.props.vault,
            Object.assign({},
              this.props.vault.metadata,
              { name: this.getFormValueByRef("vaultName") }
            )
          )
        )
      })

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

  header() {
    const { vault } = this.props;

    return(
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
          { vault.metadata.name || vault.id }
        </span>
        <span className="vault-id">
          { vault.id }
        </span>
      </div>
    );
  }

  removeUserButton(user) {
    if (this.isVaultOwner()) {
      return(
        <IconButton icon="trash"
                    onClick={() => this.removeVaultUser(user)} />
      );
    }
    return null;
  }

  addUserForm() {
    if (this.isVaultOwner()) {
      return (
        <div className="user-invite">
          <div className="add-user">
            <form>
              <h2>Invite Users</h2>
              <span>
                <div className="user-plus" onClick={this.addUser}></div>
                <FormControl ref="email"
                             className="email-input"
                             type="text"
                             placeholder="Email"
                             onKeyDown={this.onAddUserKeyDown} />
              </span>
            </form>
          </div>
        </div>
      );
    }
    return null;
  }

  deleteVaultButton() {
    if (this.isVaultOwner()) {
      return(
        <li>
          <IconButton icon="trash"
                      text="DELETE this vault on Server"
                      onClick={this.deleteVault} />
        </li>
      );
    }
    return null;
  }

  render() {
    const { vault } = this.props;

    return <Sidebar header={this.header()}>
      <div className="vault-settings-bar">
        {this.addUserForm()}
        <div className="member-list">
          <table>
            <tr>
              <th></th>
              <th className="name"><h2>Members</h2></th>
              <th className="other"></th>
            </tr>

            {
              this.props.vault_members.map((user, i) => {
                return <tr key={i} className="vault-member">
                  <td>
                    <UserIcon email={user.email} />
                  </td>
                  <td className="name">
                    {user.name} <span className="email">{user.email}</span>
                    {
                      user.join_date ?
                        <span className="join-date">
                          Joined <TimeAgo date={user.join_date} />
                        </span>:

                        null
                    }

                  </td>
                  <td className="other">
                    { i > 0 ? this.removeUserButton(user) : null }
                  </td>
                </tr>
              })
            }
          </table>
        </div>

        <ul className="vault-buttons">
          <li>
            <IconButton icon="folder"
                        text="Open Vault Folder"
                        onClick={this.openVaultFolder} />
          </li>
          { this.deleteVaultButton() }
        </ul>

      </div>
      <AddUserDialog vault={vault}
                     show={this.state.showAddDialog}
                     onClose={this.onAddUserClose}
                     email={this.state.addDialogEmail || ""} />
    </Sidebar>
  }
}

function mapStateToProps(state, ownProps) {
  const { routeParams } = ownProps;
  const { vaults, vaultusers } = state;
  return {
    user: state.user.data,
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
