import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Col, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { shell } from 'electron';

import './VaultList.global.css';


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
      <Col className="card vault-card" sm={4}>
        <div className="vaulticon"></div>
        <div className="vaultinfo">
            <h2>{vault.id} <Badge>{vault.state}</Badge></h2>
            {vault.folder}, {vault.user_count} user(s)
            <Button onClick={() => this.showFolder()}>Show files</Button>
        </div>
      </Col>
    );
  }
}

class NewVaultItem extends Component {
  /* Just shows a empty vault with a "+" button */
  render() {
    const { vault } = this.props;
    return (
      <Col className="card vault-card new-vault-card" sm={4}>
        <div className="vault-plus">+</div>
      </Col>
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
        <Grid>
          {this.props.vaults.map(v => <VaultItem key={v.id} vault={v} />)}
          <NewVaultItem />
        </Grid>
      </div>
    );
  }
}
