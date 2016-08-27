import React, { Component } from 'react';

class SyncryptComponent extends Component {
  bindFunctions(functionNames) {
    for(var i = 0; i < functionNames.length; i++) {
      var fname = functionNames[i];
      this[fname] = this[fname].bind(this);
    }
  }
}

export default SyncryptComponent;
