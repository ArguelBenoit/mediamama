'use strict';

module.exports = {
  method: 'GET',
  path: '/api/ping',
  config: {
    handler: (req, res) => {
      res('pong');
    },
    auth: {
      strategy: 'jwt'
    }
  }
};
