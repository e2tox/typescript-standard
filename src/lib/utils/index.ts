import * as path from 'path'
import * as fs from 'fs'
import * as process from 'process'
import * as glob from 'glob'

declare var __dirname;
const currentPaths: Array<string> = __dirname.split(path.sep);
const cwdPaths: string = process.cwd();

export function findup(filename: string): string | null {
  let n = currentPaths.length;
  while (n--) {
    const folder = currentPaths.slice(0, n).join(path.sep);
    const file = path.join(folder, filename);
    try {
      const stats = fs.statSync(file);
      if (stats.isFile()) {
        return file;
      }
    }
    catch (err) {
    }
  }
  return null;
}

export function isDirectory(file: string): boolean {
  const stats = fs.statSync(file);
  return stats.isDirectory();
}

export function find(filename: string): string | null {
  const file = path.join(cwdPaths, filename);
  const stats = fs.statSync(file);
  if (stats.isFile()) {
    return file;
  }
}

export function load(file): any {
  const contents = fs.readFileSync(file, 'utf8');
  try {
    return JSON.parse(contents);
  }
  catch (err) {
    console.error(`Can not parse json from ${file} because ${err.message}`);
    return null;
  }
}

export function loadText(file: string): any {
  return fs.readFileSync(file, 'utf8');
}

export function saveText(file: string, content: string): any {
  return fs.writeFileSync(file, content, 'utf8');
}

export function expend(files: Array<string>): Array<string> {
  let expended: Array<string> = [];
  if (files && files.forEach) {
    files.forEach(function (file) {
      expended = expended.concat(glob.sync(path.resolve(cwdPaths, file)));
    });
  }
  return expended;
}

export function includesInArray(arrayList, searchElement): boolean {

  const O = Object(arrayList);
  const len = parseInt(O.length, 10) || 0;
  if (len === 0) {
    return false;
  }
  const n = parseInt(arguments[1], 10) || 0;
  let k;
  if (n >= 0) {
    k = n;
  } else {
    k = len + n;
    if (k < 0) {
      k = 0;
    }
  }
  let currentElement;
  while (k < len) {
    currentElement = O[k];
    if (searchElement === currentElement ||
      (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
      return true;
    }
    k++;
  }
  return false;

}

export function startsWith(source: string, searchElement: string): boolean {
  return source.indexOf(searchElement) === 0;
}
