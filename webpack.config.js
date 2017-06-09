'use strict';

require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'eval',
  entry:`${__dirname}/app/entry.js`,
  output: {
    path: `${__dirname}/build` ,
    filename: 'bundle-[hash].js',
  },
  plugins: [
    new ExtractText('bundle-[hash].css'),
  ]
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      react: 'preact-compat', 'react-dom', 'preact-compat'
    }
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce:'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        include:[
          path.resolve(__dirname,'js'),
          path.resolve('node_modules/preact-compat/src')
        ],
        test:/\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractText.extract({
          fallback: 'style-loader',
          use: ['css-loader',  'sass-loader'],
        }),
      }
    ]
  }
}
