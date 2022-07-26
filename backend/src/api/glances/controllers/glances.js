'use strict';

const axios = require('axios');

/**
 * A set of functions called "actions" for `glances`
 */

module.exports = {
  getGlance: async (ctx, next) => {
    try {
      let body = ctx.request.body;
      let uri = body.uri;

      let res = await axios.get(uri);
      ctx.body = res.data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
