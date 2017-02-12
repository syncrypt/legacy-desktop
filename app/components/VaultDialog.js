import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Modal, Button, Checkbox, FormGroup } from 'react-bootstrap';
import UserIcon from './UserIcon';
import SyncryptComponent from './SyncryptComponent';
import VaultLog from './VaultLog';
import { addVaultUser, refreshUserKeys } from '../actions';

import './VaultDialog.css';

class VaultDialog extends SyncryptComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired
  };

  render () {
    let { Header, Footer, Body } = Modal;
    let { vault } = this.props;

    return <Modal show={this.props.show} className='vault-dialog' backdrop={true} onHide={this.props.onClose}>
      <Header>
        {vault.metadata.name || "Vault"}
      </Header>
      <Body>
        <Tabs defaultActiveKey={5} id="vault-tabs">
          <Tab eventKey={1} title="Files">Select the files to share...</Tab>
          <Tab eventKey={2} title="Users">Select the users to share with...</Tab>
          <Tab eventKey={3} title="Advanced Settings" disabled>advanced settings</Tab>
          <Tab eventKey={4} title="History">Basically the log from the server...</Tab>
          <Tab eventKey={5} title="Logs">
            <VaultLog vault={vault} />
          </Tab>
        </Tabs>
      </Body>
      <Footer>
        <Button className="btn" onClick={this.props.onClose}>
          Close
        </Button>
      </Footer>
    </Modal>
  }
}

export default connect(({ userkeys }) => {
  return {
  }
})(VaultDialog);
