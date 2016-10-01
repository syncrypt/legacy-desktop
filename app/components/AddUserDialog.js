import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Checkbox, FormGroup } from 'react-bootstrap'
import UserIcon from './UserIcon';

class AddUserDialog extends React.Component {
    render () {
        console.log(this.props.userkeys);
        return <Modal show={this.props.show}>
            <Modal.Header>
                User hinzufügen
            </Modal.Header>
            <Modal.Body>
                <UserIcon email={this.props.email} />
                {this.props.email}
                <div>
                    <h4>Schlüssel</h4>
                    {this.props.userkeys.data.map((userkey) =>
                        <div>
                            <FormGroup>
                                <Checkbox inline checked>{userkey.description} ({userkey.fingerprint})</Checkbox>
                            </FormGroup>
                        </div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn">Abbrechen</Button>
                <Button className="btn btn-primary">User hinzufügen</Button>
            </Modal.Footer>
        </Modal>
    }
}

export default connect(({ userkeys }) => ({
    userkeys: userkeys
}))(AddUserDialog);
