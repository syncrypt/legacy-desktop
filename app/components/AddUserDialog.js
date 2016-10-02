import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Checkbox, FormGroup } from 'react-bootstrap'
import UserIcon from './UserIcon';
import './AddUserDialog.css';

class AddUserDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fingerprints: []
    }
  }

  render () {
    return <Modal show={this.props.show} className='add-user-dialog'>
      <Modal.Header>
        Invite User
      </Modal.Header>
      <Modal.Body>
        <UserIcon email={this.props.email} />
        {this.props.email}
        <div>
          <h4>Device keys</h4>
          {this.props.userkeys.loading ? "Loading..." :
            this.props.userkeys.data.map((userkey) =>
              <div>
                <FormGroup>
                  <Checkbox inline checked>{userkey.description} ({userkey.fingerprint})</Checkbox>
                </FormGroup>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn">Cancel</Button>
          <Button className="btn btn-primary">Invite user and send keys</Button>
        </Modal.Footer>
      </Modal>
  }
}

export default connect(({ userkeys }) => ({
  userkeys: userkeys
}))(AddUserDialog);
