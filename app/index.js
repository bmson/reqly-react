// Global dependencies
const Webpack       = require('webpack');
const WebpackServer = require('webpack-dev-server');
const path          = require('path');

// Local dependencies
const socket  = require('./components/socket');
const symlink = require('./components/symlink');
const server  = require('./components/server');

// Get parent directory
const parent = path.dirname(module.parent.filename);

// Exposed API
exports.socket  = socket;
exports.symlink = symlink;

exports.server = (port, options) => {

  if (options.main)
    server.production(port, options, parent);
  else
    server.development(port, options, parent);

}
