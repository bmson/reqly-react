// Global dependencies
const WebpackServer = require('webpack-dev-server');
const webpack       = require('webpack');
const path          = require('path');

// Local dependencies
const helpers = require('./helpers');
const options = require('./options');

// Variables
const DEV_SERVER   = 'webpack-dev-server/client?http://localhost:';
const SYNTAX_ERROR = 'webpack/hot/only-dev-server';

// Development build
const development = (port, { input, output }, parent) => {

  // split path into filepath and filename
  const { filepath, filename } = helpers.splitPath(output);

  // Create entries
  const entries = helpers.createArray(input, i => {
    return path.join(parent, i);
  });

  // Create entry point
  const entry = [DEV_SERVER + port, SYNTAX_ERROR].concat(entries);

  // Create includes for loaders
  const includes = helpers.createArray(input, i => {

    const { filepath } = helpers.splitPath(i);
    return path.join(parent, filepath);

  });

  // Setup webpack
  const settings = options.development({ entry, filepath: parent, filename, includes });
  const compiler = webpack(settings);

  // Listener
  const onConnect = (error) => {

    // Return error
    if (error)
      return console.error(error);

    // Show success
    console.log('Listening at http://localhost:' + port);

  };

  // Create server
  const webpackServer = new WebpackServer(compiler, {

    contentBase: path.join(parent, filepath),
    hot: true,
    stats: { colors: true }

  }).listen(port, 'localhost', onConnect);

  // Return server
  return webpackServer;

};

// Production build
const production = (port, { input, main }, parent) => {

  // split path into filepath and filename
  const { filepath, filename } = helpers.splitPath(main);

  // Create includes for loaders
  const includes = helpers.createArray(input, i => {

    const { filepath } = helpers.splitPath(i);
    return path.join(parent, filepath);

  });

  // Setup webpack
  const settings = options.production({ entry: input, filepath, filename, includes });
  const compiler = webpack(settings);

  compiler.run((error, stats) => {

    // Return error
    if (error)
      return console.error(error);

      // Show success
      console.log('Build compiled');

  });

}

// Export
module.exports = { development, production };
