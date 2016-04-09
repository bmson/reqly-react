// Dependencies
var Webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');
var path = require('path');

// Get parent directory
var parent = path.dirname(module.parent.filename);

// Get webpack options
function getOptions(port, config) {

  // Create hot module
  var hotModule = new Webpack.HotModuleReplacementPlugin;

  // Return config object
  return {
    entry: [
      'webpack-dev-server/client?http://localhost:' + port,
      'webpack/hot/only-dev-server',
      path.join(parent, config.privatePath, config.privateFile)
    ],

    output: {
      path: parent,
      filename: config.publicFile
    },

    plugins: [hotModule],
    devtool: 'eval',

    module: {

      loaders: [{
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(parent, config.privatePath)
      }]

    }
  };

}

// Module definition
module.exports = {

  server: function(port, config) {

    // Setup webpack
    var options = getOptions(port, config);
    var webpack = Webpack(options);

    console.log( path.join() );

    // Create server
    var webpackServer = new WebpackServer(webpack, {

      contentBase: path.join(parent, config.publicPath),
      hot: true

    }).listen(port, 'localhost', function (error, result) {

      // Return error
      if (error)
        return console.error(err);

      // Show success
      console.log('Listening at http://localhost:' + port);

    });

  }

}
