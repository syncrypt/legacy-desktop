import { hashHistory } from 'react-router';
import rest from '../api'

export function logout() {
  return rest.actions.auth.logout((err, data) => {
    hashHistory.push('/');
  });
}

export function selectVault(vaultItem) {
  return (dispatch) => {
    if (vaultItem) {
      hashHistory.push(`/main/vault/${vaultItem.id}`)
      dispatch({type: 'SELECT_VAULT', vault_id: vaultItem.id })
      dispatch(rest.actions.vaultusers({id: vaultItem.id}))
    }
    else {
      hashHistory.push(`/main/`);
      dispatch({type: 'SELECT_VAULT', vault_id: null })
    }
  }
}

export function toggleSidebar() {
  return {type: 'TOGGLE_SIDEBAR'}
}

export function refreshUserKeys(email) {
  return (dispatch) => {
    dispatch(rest.actions.userkeys.reset());
    dispatch(rest.actions.userkeys({ email: email }));
  }
}

export function addVaultUser(vaultItem, email, fingerprints, callback) {
  return (dispatch) => {
    console.log("adding user:", email);
    dispatch(rest.actions.vaultusers.post(
        {id: vaultItem.id},
        { body: JSON.stringify({ email: email, fingerprints: fingerprints }) },
        () => {
          // After add, reload vault users
          dispatch(rest.actions.vaultusers({id: vaultItem.id}))
          if (callback) callback();
        }))
  }
}
