const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');

dotenv.config();

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@modules': path.resolve(__dirname, 'src/store/modules'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        API_BASE_URL: 'https://errorswag-staging.herokuapp.com/api/v1'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$|.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpeg|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs'
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
          'postcss-loader'
        ]
      }
    ]
  }
};
