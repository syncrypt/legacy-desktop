import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";

var adapterFetch = function(fetch) {
  return function(url, opts) {
    opts.credentials = 'same-origin';
    return fetch(url, opts).then((resp)=> resp.json());
  };
}

export default reduxApi({
  stats: {
    url: `/v1/stats`,
    transformer: transformers.object,
  },
  vaults: {
    url: `/v1/vault/`,
    transformer: transformers.array,
    crud: true
  },
  vault: {
    url: `/v1/vault/:id/`,
    crud: true,
    helpers: {
      setMetadata(vault, metadata, cb) {
        return [
          { id: vault.id }, {
            body: JSON.stringify({ metadata }),
            method: "put"
          },
          cb
        ];
      },
    }
  },
  flyingvaults: {
    url: `/v1/flying-vault/`,
    transformer: transformers.array
  },
  vaultusers: {
    url: `/v1/vault/:id/users/`,
    transformer: transformers.array,
    crud: true
  },
  vaultuser: {
    url: `/v1/vault/:id/users/:email/`,
    crud: true
  },
  userkeys: {
    url: `/v1/user/:email/keys/`,
    transformer: transformers.array,
  },
  vaultuserkeys: {
    url: `/v1/vault/:id/user/:email/keys/`,
    transformer: transformers.array,
  },
  user: {
    url: `/v1/auth/user/`,
    transformer: transformers.object
  },
  auth: {
    url: `/v1/auth/:method/`,
    helpers: {
      login(email, password) {
        return [{ method: 'login'}, {
          body: JSON.stringify({ email, password }),
          method: "post"
        }];
      },
      check() {
        return [{ method: 'check'}, {}];
      },
      logout() {
        return [{ method: 'logout'}, {}];
      },
    }
  },
})
.use("fetch", adapterFetch(fetch))
.use("rootUrl", "http://localhost:28080");
