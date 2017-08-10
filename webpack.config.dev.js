const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname),  // the home directory for webpack
 
  // here we import the augmented (custom) hot reloader client
  entry: { // string | object | array
    main:['./devScripts/client', './app']
  },

  output: {

    path: path.resolve(__dirname, 'dist'), // the target directory for all output files
    
    filename: 'js/[name].js', // the filename template for entry chunks
    
    publicPath: '/', // the url to the output directory resolved relative to the HTML page

  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Titanium',
      template: path.resolve(__dirname, './index.html'),
      inject: true,
    }),
  ],

  devtool: 'source-map', // use source-map for production
}
