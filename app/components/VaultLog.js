import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Modal, Button, Checkbox, FormGroup } from 'react-bootstrap';
import UserIcon from './UserIcon';
import SyncryptComponent from './SyncryptComponent';
import { addVaultUser, refreshUserKeys } from '../actions';

class VaultLog extends SyncryptComponent {
  componentWillMount() {
  }

  render () {
    return <div>
      <h3>Vault log</h3>
    </div>
  }
}

export default connect(({ userkeys }) => {
  return {
  }
})(VaultLog);
