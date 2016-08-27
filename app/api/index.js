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
  },
  login: {
    url: `/v1/login/`,
    options: {
      method: "post"
    }
  }
})
.use("fetch", adapterFetch(fetch))
.use("rootUrl", "http://localhost:28080");
