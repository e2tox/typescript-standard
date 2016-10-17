import * as path from 'path'
import * as glob from 'glob'
import { findup, find, load, isDirectory, includesInArray, startsWith } from '../utils'
import { ValidatorOption } from './option'
import { ValidatorOutputFormat } from './format'

export class ValidatorConfigParser {

  options(format: ValidatorOutputFormat): ValidatorOption {
    const defaultTSLintOptions = findup('tslint.json');
    if (!defaultTSLintOptions) {
      return null;
    }
    const configuration = load(defaultTSLintOptions);
    return new ValidatorOption(format, configuration);
  }

  files(): Array<string> {

    const userTSConfig = find('tsconfig.json');
    if (!userTSConfig) {
      return [];
    }

    const config = load(userTSConfig);
    const rootDir = path.dirname(userTSConfig);
    let includes: Array<string> = [];
    let excludes: Array<string> = [];
    let excludeFiles: Array<string> = [];
    let excludeFolders: Array<string> = [];

    // https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
    if (config.files && config.files.forEach) {
      config.files.forEach(function (file) {
        includes.push(path.join(rootDir, file));
      })
    }

    // Added in typescript 2
    if (config.include && config.include.forEach) {
      config.include.forEach(function (file) {
        if (file && (file.indexOf('*') >= 0 || file.indexOf('?') >= 0)) {
          includes = includes.concat(glob.sync(path.join(rootDir, file)))
        }
        else {
          includes.push(path.join(rootDir, file))
        }
      })
    }

    // Added in typescript 2.0
    if (config.exclude && config.exclude.forEach) {
      config.exclude.forEach(function (file) {
        if (file && (file.indexOf('*') >= 0 || file.indexOf('?') >= 0)) {
          excludes = excludes.concat(glob.sync(path.join(rootDir, file)))
        }
        else {
          excludes.push(path.join(rootDir, file))
        }
      });
      if (excludes.length) {
        excludeFolders = excludes.filter(function (exclude) {
          return isDirectory(exclude);
        }).map(function (folder) {
          return path.join(folder, path.sep);
        });
        excludeFiles = excludes.filter(function (exclude) {
          if (isDirectory(exclude)) {
            return false;
          }
          else {
            const matches = excludeFolders.filter(function (folder) {
              return startsWith(exclude, folder);
            });
            // does any exclude rule match the file?
            return !matches.length;
          }
        });
      }
    }

    // filter results
    return includes.filter(function (file) {
      // filter file
      if (includesInArray(excludeFiles, file)) {
        return false;
      }
      // filter by folders
      const matches = excludeFolders.filter(function (exclude) {
        return startsWith(file, exclude);
      });
      // does any exclude rule match the file?
      return !matches.length;
    });
  }

}
