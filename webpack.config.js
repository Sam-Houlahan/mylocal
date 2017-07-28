const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: './client/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new LiveReloadPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map'
}
