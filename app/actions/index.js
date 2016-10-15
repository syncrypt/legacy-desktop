import { hashHistory } from 'react-router';
import rest from '../api'

export function logout() {
  return rest.actions.auth.logout((err, data) => {
    hashHistory.push('/');
  });
}

export function openAccountSettings() {
  hashHistory.push('/account/');
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
      }
    ))
  }
}

export function setVaultMetadata(vault, metadata) {
  return (dispatch) => {
    console.log(`Setting vault metadata for ${vault.id}`)
    dispatch(rest.actions.vault.setMetadata(vault, metadata, () => {
      dispatch(rest.actions.vaults())
    }))
  }
}

export function cloneVault(vault, path, cb) {
  return (dispatch) => {
    console.log(`Cloning vault ${vault.id} into ${path}`)
    dispatch(rest.actions.vaults.post({},
      { body: JSON.stringify({id: vault.id, folder: path}) },
      (err) => {
        if(err) {
          console.log(`Error cloning vault ${vault.id} into ${path}`)
        }
        dispatch(rest.actions.vaults())
        if (cb) {
          cb(err)
        }
      }
    ))
  }
}

export function deleteVault(vault, cb) {
  return (dispatch) => {
    console.log(`Deleting vault ${vault.id}`)
    dispatch(rest.actions.vault.delete({ id: vault.id, wipe: 1},
      {},
      (err) => {
        if(err) {
          console.log(`Error deleting vault ${vault.id}`)
        }
        else {
          hashHistory.push(`/main/`);
          dispatch(rest.actions.vaults())
        }
        if (cb) {
          cb(err)
        }
      }
    ))
  }
}

export function removeVault(vault, cb) {
  return (dispatch) => {
    console.log(`Removing vault ${vault.id}`)
    dispatch(rest.actions.vault.delete({id: vault.id},
      { },
      (err) => {
        if(err) {
          console.log(`Error removing vault ${vault.id}`)
        }
        else {
          hashHistory.push(`/main/`);
          dispatch(rest.actions.vaults())
        }
        if (cb) {
          cb(err)
        }
      }
    ))
  }
}
