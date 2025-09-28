const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientPath = path.resolve(__dirname, 'client');
const distPath = path.resolve(__dirname, 'build');
const publicPath = '/';
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const SERVER_PORT = process.env.SERVER_PORT || 4444;
const proxy = `http://127.0.0.1:${SERVER_PORT}`;

console.log('CLIENT_PORT', CLIENT_PORT);
console.log('environment: development');
console.log('source map: eval-cheap-module-source-map');
console.log('proxy:', proxy);

module.exports = {
  mode: 'development',
  target: 'web',
  cache: true,
  devtool: 'eval-cheap-module-source-map',
  performance: { hints: false },
  entry: path.join(clientPath, 'index.js'),
  output: {
    filename: 'js/[name].js',
    path: distPath,
    publicPath,
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(clientPath),
      '@app': path.resolve(clientPath, '1-app'),
      '@pages': path.resolve(clientPath, '2-pages'),
      '@widgets': path.resolve(clientPath, '3-widgets'),
      '@features': path.resolve(clientPath, '4-features'),
      '@shared': path.resolve(clientPath, '5-shared'),
      '@tools': path.resolve(clientPath, 'tools'),
    },
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    symlinks: true,
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    devMiddleware: {
      publicPath,
      stats: {
        colors: true,
        assets: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: true,
        errorDetails: true,
      },
    },
    static: {
      directory: distPath,
    },
    client: {
      overlay: false,
    },
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: CLIENT_PORT,
    historyApiFallback: true,
    hot: true,
    proxy: [
      {
        context: '/api',
        target: proxy,
        changeOrigin: false,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [clientPath],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            compact: false,
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        include: clientPath,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: { filename: 'static/[name][ext]' },
      },
    ],
  },
  optimization: {
    moduleIds: 'named',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(clientPath, 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      PRODUCTION: JSON.stringify(false),
    }),
  ],
};
