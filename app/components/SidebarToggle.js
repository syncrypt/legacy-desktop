import React, { PropTypes } from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import './SidebarToggle.css';

class SidebarToggle extends SyncryptComponent {
  className() {
    return "sidebar-toggle toggle-" + this.props.direction;
  }

  render() {
    let { toggleSidebar } = bindActionCreators(actions, this.props.dispatch);
    return (
      <div className={this.className()} onClick={toggleSidebar}>
        <img src="./assets/triangle.png" />
      </div>
    );
  }
}

export default connect()(SidebarToggle);
