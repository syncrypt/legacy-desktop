import React, { PropTypes } from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import { connect } from 'react-redux';
import './SidebarToggle.css';

class SidebarToggle extends SyncryptComponent {
  constructor(props) {
    super(props);
    this.bindFunctions(["toggle"]);
    this.state = {
      direction: "right"
    };
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  toggle() {
    var direction = "left"
    if(this.state.direction == "left") {
      direction = "right"
    }
    this.setState({direction: direction});
    this.props.onClick();
  }

  className() {
    return "sidebar-toggle toggle-" + this.state.direction;
  }

  render() {
    return (
      <div className={this.className()} onClick={this.toggle}>
        <img src="./assets/triangle.png" />
      </div>
    );
  }
}

export default connect()(SidebarToggle);
