import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Checkbox, FormGroup } from 'react-bootstrap';
import UserIcon from './UserIcon';
import SyncryptComponent from './SyncryptComponent';
import { addVaultUser, refreshUserKeys } from '../actions';

import './AddUserDialog.css';

class AddUserDialog extends SyncryptComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      fingerprints: this.props.userkeys.data.map((userkey) => userkey.fingerprint)
    }
    this.bindFunctions(['onAddUser'])
  }

  componentWillReceiveProps(props) {
    this.setState({
      fingerprints: props.userkeys.data.map((userkey) => userkey.fingerprint)
    });
  }

  toggleFingerprint(fingerprint) {
    if (this.state.fingerprints.includes(fingerprint)) {
      this.setState({
        fingerprints: this.state.fingerprints.filter((fp) => fp != fingerprint)
      })
    }
    else {
      this.setState({
        fingerprints: this.state.fingerprints.concat([fingerprint])
      })
    }
  }

  onAddUser() {
    this.props.dispatch(addVaultUser(this.props.vault, this.props.email, this.state.fingerprints,
      () => {
        this.props.onClose();
      }));
  }

  render () {
    let fingerprints = this.state.fingerprints;
    let { Header, Footer, Body } = Modal;
    return <Modal show={this.props.show} className='add-user-dialog' backdrop={true} onHide={this.props.onClose}>
      <Header>
        Invite User
      </Header>
      <Body>
        <div className="user-info">
          <UserIcon email={this.props.email} />
          <span className="user-email">{this.props.email}</span>
        </div>
        <div>
          <h4>Device keys</h4>
          {this.props.userkeys.loading ? "Loading..." :
            this.props.userkeys.data.map((userkey) =>
              <div>
                <FormGroup>
                  <Checkbox inline
                            checked={fingerprints.includes(userkey.fingerprint)}
                            onChange={() => this.toggleFingerprint(userkey.fingerprint)}>
                    {userkey.description} ({userkey.fingerprint})
                  </Checkbox>
                </FormGroup>
              </div>
            )}
          </div>
        </Body>
        <Footer>
          <Button className="btn" onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button className="btn btn-primary"
                  disabled={fingerprints.length == 0}
                  onClick={this.onAddUser}>
            Invite user and send keys
          </Button>
        </Footer>
      </Modal>
  }
}

export default connect(({ userkeys }) => {
  return {
    userkeys: userkeys
  }
})(AddUserDialog);
