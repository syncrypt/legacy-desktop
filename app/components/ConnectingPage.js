import React from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import { Link } from 'react-router';
import styles from './ConnectingPage.css';

class ConnectingPage extends SyncryptComponent {
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
