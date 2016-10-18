import React, { PropTypes } from 'react';
import SyncryptComponent from './SyncryptComponent';
import './IconButton.css';

export default class IconButton extends SyncryptComponent {
  text() {
    if(this.props.text) {
      return(
        <span className="icon-button-text">
          {this.props.text}
        </span>
      );
    }
    return null;
  }

  style() {
    return {
      backgroundImage: "url(assets/" + this.props.icon + ".png)"
    };
  }

  render () {
    return(
      <div className="icon-button" {...this.props}>
        <div className="icon" style={this.style()}></div>
        {this.text()}
      </div>
    );
  }
}
