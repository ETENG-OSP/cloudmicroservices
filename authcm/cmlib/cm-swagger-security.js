function factory(opts) {
  return {
    cmjwt: cmjwt
  };

  function cmjwt(req, definitions, apiKey, callback) {
    opts
      .cm
      .verify(apiKey)
      .then(function(payload) {
        req.cm = {
          payload: payload,
          appId: payload.aud
        };
        callback();
      })
      .catch(callback);
  }
}

module.exports = factory;
