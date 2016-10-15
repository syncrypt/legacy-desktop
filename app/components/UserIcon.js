import React, { PropTypes } from 'react';
import jdenticon from 'jdenticon';
import {md5} from '../utils';

export default class UserIcon extends React.Component {
  componentDidMount() {
    jdenticon.update(this.refs.iconCanvas);
  }

  render () {
    return(
      <canvas ref="iconCanvas" className="vault-member-icon" width="50" height="50" data-jdenticon-hash={md5(this.props.email)}>
      </canvas>
    );
  }
}
