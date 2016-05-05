// Dependencies
const Webpack       = require('webpack');
const WebpackServer = require('webpack-dev-server');
const path          = require('path');
const fs            = require('fs');
const socket        = require('./socket');

// Get parent directory
const parent = path.dirname(module.parent.filename);

// Split path into filepath and filename
const splitPath = (url) => {

  const lastIndex = url.lastIndexOf('/');

  const filepath = url.substring(0, lastIndex);
  const filename = url.substring(lastIndex + 1);

  return { filepath, filename }
}

// Manipulate array
const createArray = (value, fn) => {

  const array = [].concat(value);
  return array.map(item => fn.call(this, item));

}

// Get webpack options
function getOptions(port, config) {

  // Create hot module
  var hotModule = new Webpack.HotModuleReplacementPlugin;

  // Create server and hotloader
  var devServer   = 'webpack-dev-server/client?http://localhost:' + port;
  var syntaxError = 'webpack/hot/only-dev-server';

  // Create entries
  const entries = createArray(config.input, i => path.join(parent, i));
  const entry = [devServer, syntaxError].concat(entries);

  // Create output path
  const output = splitPath(config.output);

  // Create loaders
  const includes = createArray(config.input, i => {
    const input = splitPath(i);
    return path.join(parent, input.filepath)
  });

  // Return config object
  return {
    entry: entry,

    output: {
      path: parent,
      filename: output.filename
    },

    plugins: [hotModule],
    devtool: 'eval',

    module: {

      loaders: [{
        test: /\.js$/,
        include: includes,
        loaders: ['react-hot', 'babel']
      },{
        test: /\.jsx$/,
        include: includes,
        loaders: ['react-hot', 'babel']
      },{
        test: /\.css$/,
        include: includes,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path][name]-[local]___[hash:base64:5]'
      }]

    },

    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };

}

// Listen callback
const connected = (port, error) => {

  // Return error
  if (error)
    return console.error(err);

    // Show success
  console.log('Listening at http://localhost:' + port);

}

// Create socket connection
exports.socket = socket.connect;

// Create a symlink based on the url and name
exports.symlink = function(url, name, modules = './node_modules/') {

  // Get path of application relative to modules
  const main = path.relative(modules, url);

  // Create a symlink
  fs.symlink(main, modules + name, e => {});

}

// Create server
exports.server = function(port, config) {

  // split path into filepath and filename
  const output = splitPath(config.output);

  // Setup webpack
  var options = getOptions(port, config);
  var webpack = Webpack(options);

  // Create server
  var webpackServer = new WebpackServer(webpack, {

    contentBase: path.join(parent, output.filepath),
    hot: true

  }).listen(port, 'localhost', error => connected(port, error));

}
