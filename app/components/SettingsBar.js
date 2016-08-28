import React from 'react';
import SyncryptComponent from './SyncryptComponent';
import { Link } from 'react-router';
import './SettingsBar.global.css';

class SettingsBar extends SyncryptComponent {
  addUser() {
    // TODO
  }

  render() {
    return (
      <div className="settings-bar">
        <div className="header">
        </div>
        <div className="content">
          <div className="user-invite">
            <div className="add-user">
              <form>
                <span>
                  <Button onClick={this.addUser}></Button>
                  <h1>Invite Users</h1>
                </span>
                <FormControl ref="email" type="text" placeholder="Email" />
              </form>
            </div>
          </div>

          <div className="member-list">
            <table>
              <tr>
                <th></th>
                <th>Members</th>
                <th>Joined</th>
                <th>Last Login</th>
              </tr>

              {
                this.props.vault_members.map((user, i) =>
                  <tr key={i} className="vault-member">
                    <td>
                      <img className="vault-member-icon" src={user.icon_url} />
                    </td>
                    <td>
                      {user.name} <span className="email">{user.email}</span>
                    </td>
                    <td>{user.join_date}</td>
                    <td>{user.last_login_date}</td>
                  </tr>
                )
              }
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectingScreen;
