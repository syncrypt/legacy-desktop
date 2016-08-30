import React from 'react';
import SyncryptComponent from './SyncryptComponent';
import { Link } from 'react-router';
import './Sidebar.css';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import SidebarToggle from '../components/SidebarToggle';

class Sidebar extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["toggle"])
    this.state = {
      errors: [],
      hidden: false
    };
  }

  toggle() {
    var hidden = !this.state.hidden;
    this.setState({hidden: hidden})
    this.props.onToggle(hidden)
  }

  className() {
    if(this.state.hidden) {
      return "sidebar collapsed";
    } else {
      return "sidebar";
    }
  }

  render(content) {
    return (
      <div className={this.className()}>
        <div className={"header" + (this.state.hidden ? " hidden" : "")}>
        </div>
        <div>
          <SidebarToggle onClick={this.toggle} />
          <div className={"content" + (this.state.hidden ? " hidden" : "")}>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar
