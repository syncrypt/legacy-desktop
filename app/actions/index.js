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

export function addVaultUser(vaultItem, email) {
  return (dispatch) => {
    dispatch(rest.actions.vaultusers.post(
        {id: vaultItem.id},
        { body: JSON.stringify({ email: email }) },
        () => {
          // After add, reload vault users
          dispatch(rest.actions.vaultusers({id: vaultItem.id}))
        }))
  }
}
