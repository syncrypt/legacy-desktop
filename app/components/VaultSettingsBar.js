import React, { PropTypes } from 'react';
import Sidebar from './Sidebar';
import './VaultSettingsBar.css';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { shell } from 'electron';
import SyncryptComponent from './SyncryptComponent';
import rest from '../api';

class VaultSettingsBar extends SyncryptComponent {
  static propTypes = {
    vault: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.bindFunctions(["addUser", "openVaultFolder"]);
  }

  addUser() {
    let email = this.getFormValueByRef('email');
    console.log("adding user:", email);
    // TODO this.props.dispatch(addVaultUser(this.props.vault, email));
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
        <Button onClick={this.openVaultFolder}>Open Vault Folder</Button>
        <span className="vault-name">{vault.metadata.name || vault.id}</span>
      </div>;
    return <Sidebar header={header}>
      <div>
        <div className="user-invite">
          <div className="add-user">
            <form>
              <h2>Invite Users</h2>
              <span>
                <div className="user-plus" onClick={this.addUser}></div>
                <FormControl ref="email" className="email-input" type="text" placeholder="Email" />
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
              <th className="other">Uploads</th>
            </tr>

            {
              this.props.vault_members.map((user, i) =>
                <tr key={i} className="vault-member">
                  <td>
                    <img className="vault-member-icon" src={user.icon_url} />
                  </td>
                  <td className="name">
                    {user.name} <span className="email">{user.email}</span>
                  </td>
                  <td className="other">{user.join_date}</td>
                  <td className="other">{user.uploads}</td>
                </tr>
              )
            }
          </table>
        </div>
      </div>
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
        icon_url: "https://avatars0.githubusercontent.com/u/17142?v=3&s=460",
        email: vu.email,
        name: vu.email,
        join_date: "01.08.2016",
        uploads: 1000
      }))
  };
}

export default connect(mapStateToProps)(VaultSettingsBar);
