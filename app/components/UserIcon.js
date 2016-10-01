import React, { PropTypes } from 'react';
import crypto from 'crypto';

function md5(data) {
  return crypto.createHash('md5').update(data).digest("hex");
}

function gravatarIconUrl(email) {
  var hash = md5(email.trim().toLowerCase());
  return "https://www.gravatar.com/avatar/" + hash;
}

export default class UserIcon extends React.Component {
  render () {
    var iconUrl = gravatarIconUrl(this.props.email);
    return <img className="vault-member-icon" src={iconUrl} />;
  }
}

