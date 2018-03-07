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

const outputDir = path.join(__dirname, 'release');

export default [
  {
    mode: 'development',
    target: 'node',
    entry: {
      cli: './src/bin/cli.ts'
    },
    output: {
      path: path.join(outputDir, 'bin'),
      filename: '[name].js'
    },
    node: {
      __dirname: false
    },
    externals: externalNodeModules,
    resolve: {
      extensions: ['.ts']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader?configFile=' + path.join(projectRoot, 'tsconfig.release.json')
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, entryOnly: true })
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   }
      // })
    ]
  }, {
    mode: 'development',
    target: 'node',
    entry: {
      index: './src/bin/index.ts'
    },
    output: {
      path: path.join(outputDir, 'bin'),
      filename: '[name].js',
      libraryTarget: 'commonjs'
    },
    node: {
      __dirname: false
    },
    externals: externalNodeModules,
    resolve: {
      extensions: ['.ts']
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader?configFile=' + path.join(projectRoot, 'tsconfig.release.json') }
      ]
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   }
      // })
    ]
  }
]
