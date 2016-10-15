import React, { PropTypes } from 'react';
import jdenticon from 'jdenticon';
import {md5} from '../utils';

export default class VaultIcon extends React.Component {
  componentDidMount() {
    jdenticon.update(this.refs.iconCanvas);
  }

  render () {
    return(
      <canvas ref="iconCanvas" className="vault-icon" width="100" height="100" data-jdenticon-hash={md5(this.props.vault.id)}>
      </canvas>
    );
  }
}
