import * as path from 'path'
import * as fs from 'fs'
import * as webpack from 'webpack'

declare var __dirname;
const projectRoot = __dirname;
let externalNodeModules = Object.create(null);

// all node_modules will be consider as externals
fs.readdirSync(path.join(projectRoot, 'node_modules'))
  .filter((x: string) => ['.bin'].indexOf(x) === -1)
  .forEach((mod: string) => {
    externalNodeModules[mod] = `commonjs ${mod}`
  });

export default [{
  target: 'node',
  entry: {
    cli: './src/bin/cli.ts'
  },
  output: {
    path: path.join(projectRoot, 'bin'),
    filename: '[name].js'
  },
  node: {
    __dirname: false
  },
  externals: externalNodeModules,
  resolve: {
    extensions: ['', '.ts']
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('#!/usr/bin/env node', { raw: 1, entryOnly: 1 }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
},
  {
    target: 'node',
    entry: {
      index: './src/bin/index.ts'
    },
    output: {
      path: path.join(projectRoot, 'bin'),
      filename: '[name].js',
      libraryTarget: 'commonjs'
    },
    node: {
      __dirname: false
    },
    externals: externalNodeModules,
    resolve: {
      extensions: ['', '.ts']
    },
    module: {
      loaders: [
        {test: /\.ts$/, loader: 'ts-loader'}
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }
]
