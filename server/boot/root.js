'use strict';

module.exports = function(app) {
  // Install a `/` route that returns server status
  app.get('/', function(req, res) {
    res.json({
      status: 'Training system API Server',
      timestamp: new Date().toISOString()
    });
  });
};
