import React from 'react';
import SyncryptComponent from './SyncryptComponent';
import { Link } from 'react-router';
import './SettingsBar.global.css';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';


class SettingsBar extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["addUser"])
    this.state = {
      errors: []
    };
  }

  addUser() {
    // TODO
    console.log("adding user")
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
                  <div className="user-plus" onClick={this.addUser}></div>
                  <h2>Invite Users</h2>
                </span>
                <FormControl ref="email" className="email-input" type="text" placeholder="Email" />
              </form>
            </div>
          </div>

          <div className="member-list">
            <table>
              <tr>
                <th></th>
                <th><h2>Members</h2></th>
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

function mapStateToProps(state) {
  return {
    vault_members: [
      {
        icon_url: "https://avatars0.githubusercontent.com/u/17142?v=3&s=460",
        email: "chris@syncrypt.space",
        name: "Christopher Bertels",
        join_date: "01.08.2016",
        last_login_date: "28.08.2016"
      }
    ]
  };
}

export default connect(mapStateToProps)(SettingsBar);
