import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const production = process.env.NODE_ENV === 'production';

const config: webpack.Configuration & { devServer?: Configuration } = {
  mode: production ? 'production' : 'development',
  entry: {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? '[name].[contenthash].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: production ? 'tsconfig.prod.json' : 'tsconfig.json',
            },
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
      chunks: ['polyfills', 'main'],
      chunksSortMode: 'manual',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
        { from: './src/favicon.png', to: 'favicon.png' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash].css' : '[name].css'
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: production ? false : 'source-map',
  externals: [],
  devServer: {
    hot: true,
    contentBase: './dist/',
    clientLogLevel: 'warning',
  },
  optimization: {
    runtimeChunk: 'single',
  },
};

export default config;
