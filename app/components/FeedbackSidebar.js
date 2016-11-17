import React from 'react';
import Sidebar from './Sidebar';
import SyncryptComponent from './SyncryptComponent';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import './FeedbackSidebar.css';
import IconButton from './IconButton';
import rest from '../api';
import { hashHistory } from 'react-router';

class FeedbackSidebar extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["sendFeedback", "cancel"]);
  }

  sendFeedback() {
    this.props.dispatch(rest.actions.feedback.send(this.getFormValueByRef('feedback-text')))
    hashHistory.push(`/main/`)
  }

  cancel() {
    hashHistory.push(`/main/`)
  }

  render() {
    const { account } = this.props;
    const header = <div className="account-settings-header">
      Syncrypt Alpha Feedback
    </div>;

    return(
      <Sidebar header={header}>
        <div className="feedback-sidebar">
          <h1>
            Thanks for sending us valuable feedback.
          </h1>

          <form>
            <FormGroup controlId="formBasicText">
              <ControlLabel>Your Feedback</ControlLabel>
              <FormControl className="feedback-text" componentClass="textarea" ref="feedback-text" placeholder="Type your feedback here."/>
              <Button onClick={this.sendFeedback}>Send Feedback</Button>
              &nbsp;<Button onClick={this.cancel}>Cancel</Button>
            </FormGroup>
          </form>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data
  };
}

export default connect(mapStateToProps)(FeedbackSidebar);
