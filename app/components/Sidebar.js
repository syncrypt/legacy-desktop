import React from 'react';
import SyncryptComponent from './SyncryptComponent';
import { Link } from 'react-router';
import './Sidebar.css';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import SidebarToggle from '../components/SidebarToggle';
import * as actions from '../actions';

class Sidebar extends SyncryptComponent {
  className() {
    if (this.props.hidden) {
      return "sidebar collapsed";
    } else {
      return "sidebar";
    }
  }

  render(content) {
    return (
      <div className={this.className()}>
        <div className="header">
          {this.props.header}
        </div>
        <div>
          <SidebarToggle direction={this.props.hidden ? 'left' : 'right'} />
          <div className="content">
            {this.props.children}
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

export default connect(mapStateToProps)(Sidebar)
