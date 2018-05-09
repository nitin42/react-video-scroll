const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const output = () => ({
  filename: 'react-video-scroll.min.js',
  path: path.resolve(__dirname, './build'),
  publicPath: '/',
  libraryTarget: 'umd'
})

const externals = () => ({
  'react-dom': 'react-dom',
  'prop-types': 'prop-types',
  react: 'react'
})

const jsLoader = () => ({
  test: /\.js$/,
  include: path.resolve(__dirname, './src'),
  exclude: ['node_modules', 'flow-typed'],
  use: 'babel-loader'
})

const plugins = () => [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new UglifyJSPlugin()
]

module.exports = {
  entry: path.resolve(__dirname, './src/VideoScroll.js'),
  mode: 'production',
  output: output(),
  target: 'web',
  externals: externals(),
  devtool: 'source-map',
  module: {
    rules: [jsLoader()]
  },
  plugins: plugins()
}
