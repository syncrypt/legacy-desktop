import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import fs from 'fs';
import expandHomeDir from 'expand-home-dir';

const daemonConfig = expandHomeDir('~/.config/syncrypt/config');

var readAuthToken = function(resolve, reject) {
  console.info('Trying to read auth token');
  fs.readFile(daemonConfig, 'utf-8', function (err, data) {
    if (err) {
      reject();
      return;
    }
    const token = new RegExp("auth_token = ([a-zA-Z0-9]+)").exec(data);
    if (token && token.length == 2) {
      console.log("The auth token is: " + token[1]);
      resolve(token[1]);
    }
    else {
      reject();
    }
  });
}

var adapterFetch = function(fetch) {
  let authToken = new Promise((resolve) => {
    let retry = () => setTimeout(() => readAuthToken(resolve, retry), 1000);
    readAuthToken(resolve, retry);
  });
  return function(url, opts) {
    return authToken.then((token) => {
      opts.credentials = 'same-origin';
      opts.headers = Object.assign(opts.headers || {}, {
        'X-AuthToken': token
      });
      return fetch(url, opts)
    }).then((resp)=> resp.json());
  };
}

function strictArrayTransformer(data, prevData, action) {
  if (data && data.resource_uri) {
    console.log('Single object returned, ignoring non-array response')
    return prevData;
  }
  return transformers.array(data, prevData, action);
}

export default reduxApi({
  stats: {
    url: `/v1/stats`,
    transformer: transformers.object,
  },
  vaults: {
    url: `/v1/vault/`,
    transformer: strictArrayTransformer,
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
      }
    }
  },
  flyingvaults: {
    url: `/v1/flying-vault/`,
    transformer: transformers.array
  },
  vaultusers: {
    url: `/v1/vault/:id/users/`,
    transformer: strictArrayTransformer,
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
  feedback: {
    url: `/v1/feedback/`,
    helpers: {
      send(feedback_text) {
        return [{}, {
          body: JSON.stringify({ feedback_text }),
          method: 'post',
        }];
      },
    }
  },
  version: {
    url: `/v1/version/`,
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
