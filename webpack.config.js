const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.ts',
    style: './src/style.scss',
    polyfills: './src/polyfills.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'eslint-loader',
          },
        ],
        enforce: 'pre',
        include: [
          path.join(__dirname, './src'),
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        include: [
          path.join(__dirname, './src'),
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
        include: [
          path.join(__dirname, './src/styles'),
          path.join(__dirname, './src/style.scss'),
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['polyfills', 'style', 'main'],
      chunksSortMode: 'manual',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
        { from: './src/favicon.png', to: 'favicon.png' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [],
};
