// Global dependencies
const webpack = require('webpack');

// Module definition
const development = ({ entry, filepath, filename, includes }) => ({

    entry: entry,

    output: {
      path: filepath,
      filename: filename
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin
    ],

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
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]'
      }]

    },

    resolve: {
      extensions: ['', '.js', '.jsx']
    }

});

const production = ({ entry, filepath, filename, includes }) => ({

    entry: entry,

    output: {
      path: filepath,
      filename: filename,
      libraryTarget: 'umd'
    },

    module: {

      loaders: [{
        test: /\.js$/,
        include: includes,
        loaders: ['babel']
      },{
        test: /\.jsx$/,
        include: includes,
        loaders: ['babel']
      },{
        test: /\.css$/,
        include: includes,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]'
      }]

    },

    resolve: {
      extensions: ['', '.js', '.jsx']
    }

});

// Export
module.exports = { development, production };
