'use strict';

const childProcess = require('child_process');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const webpack = require('webpack');

const apiUrl = process.env.SCRAPPER_487_API_URL;
if (!apiUrl) {
    throw new Error('You should provide SCRAPPER_487_API_URL env var');
}

const pusherUrl = process.env.SCRAPPER_487_PUSHER_URL;
if (!pusherUrl) {
    throw new Error('You should provide SCRAPPER_487_PUSHER_URL env var');
}

const gitHash = String(childProcess.execSync('git rev-parse HEAD')).trim();

module.exports = {
    context: __dirname,
    entry: {
        app: ['babel-polyfill', './src/index.jsx'],
        'firebase-messaging-sw': './src/push-sw.js',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
    },
    module: {
        rules: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            {
                test: /\.css?$/,
                loaders: [
                    {
                        loader: 'style-loader',
                        options: {
                            attrs: { nonce: gitHash }
                        }
                    },
                    'css-loader'
                ]
            },
            { test: /\.txt?$/, loaders: ['raw-loader'] },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: `"${apiUrl}"`,
                PUSHER_URL: `"${pusherUrl}"`,
                GIT_HASH: `"${gitHash}"`,
            }
        }),

        new CopyWebpackPlugin([{ from: 'assets' }]),

        new ServiceWorkerWebpackPlugin({
            entry: './src/offline-sw.js',
            filename: 'sw.js',
            excludes: ['**/robots.txt'],
            transformOptions(options) {
                const { assets } = options;
                const newAssets = assets.filter(name => !name.endsWith('.gz') && !name.endsWith('.br'));

                newAssets.unshift('/index.html');

                return {
                    assets: newAssets,
                    gitHash
                };
            },
        }),
    ],
    devtool: 'cheap-module-source-map',
};
