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
        uploads: 1000
      }
    ]
  };
}

export default connect(mapStateToProps)(SettingsBar);
