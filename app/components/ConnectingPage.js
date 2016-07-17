import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ConnectingPage.css';

class ConnectingPage extends Component {
  render() {
    return (
      <div>
        <div className={styles.banner}>
          Waiting for Syncrypt Daemon...
        </div>
      </div>
    );
  }
}

export default ConnectingPage;
