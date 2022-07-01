import 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESlintWebpackPlugin from 'eslint-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export default function(env: Record<string, any>): webpack.Configuration {
  const { PRODUCTION: production, DEBUG: debug } = env;

  return {
    mode: production ? 'production' : 'development',
    entry: {
      main: './src/main.ts',
      polyfills: './src/polyfills.ts',
    },
    target: 'web',
    devtool: production ? false : 'source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      clean: true,
      filename: production ? '[name].[contenthash].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.build.json',
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
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: production ? 'compressed' : 'expanded',
                },
              },
            },
          ],
          include: [
            path.join(__dirname, './src/styles'),
            path.join(__dirname, './src/style.scss'),
          ],
        },
      ],
    },
    plugins: (() => {
      const plugins: webpack.Configuration['plugins'] = [
        // new webpack.BannerPlugin({
        //   raw: true,
        //   banner: '#!/usr/bin/env node',
        //   entryOnly: true,
        // }),
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
        new ESlintWebpackPlugin({
          files: './src/**/*.ts',
        }),
        new MiniCssExtractPlugin({
          filename: production ? 'styles.[contenthash].css' : 'styles.css'
        }),
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            configFile: 'tsconfig.build.json',
          }
        }),
      ];

      if (production) {
        plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            /src\/environments\/environment\.ts/,
            './environment.prod.ts'
          ),
        );
      }
      return plugins;
    })(),
    resolve: {
      plugins: [
        new TsconfigPathsWebpackPlugin({
          configFile: 'tsconfig.build.json',
        }),
      ],
      extensions: ['.ts', '.js', '.json'],
    },
    externals: [

    ],
    devServer: {
      hot: true,
    },
    optimization: {
      minimize: production,
      // { terserOptions: { mangle: false, keep_fnames: true, keep_classnames: true } }
      minimizer: production ? [new TerserWebpackPlugin()] : undefined,
      runtimeChunk: 'single',
    },
  };
}
