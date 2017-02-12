import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Modal, Button, Checkbox, FormGroup } from 'react-bootstrap';
import UserIcon from './UserIcon';
import SyncryptComponent from './SyncryptComponent';
import { addVaultUser, refreshUserKeys } from '../actions';

import rest from '../api'
import './VaultLog.css'

class VaultLog extends SyncryptComponent {
  componentWillMount() {
    this.props.dispatch(rest.actions.vaultlog.reset());
    this.props.dispatch(rest.actions.vaultlog({ vault_id: this.props.vault.id }));
  }

  render () {
    return <div className='vault-log'>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
        { this.props.vaultlog.map((row) => (
          <tr>
            <td>{row.date}</td>
            <td>{row.level}</td>
            <td>{row.message}</td>
          </tr>
        )) }
        </tbody>
      </table>
    </div>
  }
}

export default connect(({ vaultlog }) => {
  return {
    vaultlog: vaultlog.data
  }
})(VaultLog);
