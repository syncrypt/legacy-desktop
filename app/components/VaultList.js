import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './VaultList.css';
import { ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { shell } from 'electron';


class VaultItem extends Component {
  static propTypes = {
    vault: PropTypes.object.isRequired
  };

  showFolder() {
    shell.openItem(this.props.vault.folder);
  }

  render() {
    const { vault } = this.props;
    return (
      <ListGroupItem className={styles.vaultitem}>
        <div className={styles.vaulticon}></div>
        <div className={styles.vaultinfo}>
            <h2>Vault {vault.id} <Badge>{vault.state}</Badge>
            </h2>
            <ul>
                <li>Path: {vault.folder}</li>
                <li>Shared with {vault.user_count} user(s)</li>
            </ul>
            <Button onClick={() => this.showFolder()}>Show files</Button>
        </div>
      </ListGroupItem>
    );
  }
}

export default class VaultList extends Component {
  static propTypes = {
    vaults: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        <ListGroup>
        {this.props.vaults.map(v => <VaultItem key={v.id} vault={v} />)}
        </ListGroup>
      </div>
    );
  }
}
