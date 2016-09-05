import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SyncryptComponent extends Component {
  bindFunctions(functionNames) {
    for(var i = 0; i < functionNames.length; i++) {
      var fname = functionNames[i];
      this[fname] = this[fname].bind(this);
    }
  }

  getFormValueByRef(name) {
    return ReactDOM.findDOMNode(this.refs[name]).value
  }
}

export default SyncryptComponent;
