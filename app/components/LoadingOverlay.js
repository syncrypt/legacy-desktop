import React from 'react';
import SyncryptComponent from './SyncryptComponent';
import { Link } from 'react-router';
import './Sidebar.css';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import * as actions from '../actions';

import './LoadingOverlay.css'

class LoadingOverlay extends SyncryptComponent {
  render() {
    return (
        <div className="loading-overlay">
            <div className="inner">
                <Spinner spinnerName='three-bounce' noFadeIn />
                <div>
                    <small>{this.props.reason}</small>
                </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps({ navigation }) {
  return {
    hidden: navigation.sidebarHidden
  }
}

export default connect(mapStateToProps)(LoadingOverlay)
