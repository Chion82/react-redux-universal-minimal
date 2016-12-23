import webpack from 'webpack';
import fs from 'fs';

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// eslint-disable-next-line
const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';

module.exports = {
  entry: [
    'babel-polyfill',
    './src/server/index.js'
  ],

  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

  output: {
    path: 'dist/server',
    filename: 'index.js',
  },

  externals: nodeModules,

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.(svg|png|jpe?g|gif|woff2?|otf|ttf|eot)$/,
        loaders: ['url-loader?limit=10000&name=static/[hash].[ext]'],
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new webpack.DefinePlugin({
      __DEVELOPMENT__,
      __SERVER_SIDE__: true,
    }),
  ],

};

if (__DEVELOPMENT__) {
  module.exports.devtool = 'cheap-module-eval-source-map';
  module.exports.entry.unshift('webpack/hot/poll?1000');
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  module.exports.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  );
}
