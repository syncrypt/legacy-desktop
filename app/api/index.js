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
  vaultusers: {
    url: `/v1/vault/:id/users/`,
    transformer: transformers.array,
  },
  vaultuserkeys: {
    url: `/v1/vault/:id/user/:email/keys/`,
    transformer: transformers.array,
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
