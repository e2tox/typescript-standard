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
    const stats = fs.statSync(file);
    if (stats.isFile()) {
      return file;
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
  
  var O = Object(arrayList);
  var len = parseInt(O.length, 10) || 0;
  if (len === 0) {
    return false;
  }
  var n = parseInt(arguments[1], 10) || 0;
  var k;
  if (n >= 0) {
    k = n;
  } else {
    k = len + n;
    if (k < 0) {k = 0;}
  }
  var currentElement;
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
