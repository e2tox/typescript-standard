# Zero-configuration TypeScript Standard Validator & Formatter

Validate and format your TypeScript using Visual Studio styles.

## Installation

```sh
npm install typescript-standard --save-dev
```

## Uninstall

```sh
npm uninstall typescript-standard --save-dev
```

## Usage

package.json

```json
{
  "scripts": {
    "test": "node_modules/.bin/standard"
  }
}

```

CLI at project root folder

```sh
./node_modules/.bin/standard
./node_modules/.bin/standard --pretty
```

or in your code

```node
var engine = require('typescript-standard')
console.log(engine.lint());
```

## Extras

[typescript-standard-loader](https://www.npmjs.com/package/typescript-standard-loader) - [Webpack@2+](https://www.npmjs.com/package/webpack) loader

## Tips

Here is a easier way to run local node_modules by adding the .bin folder into your $PATH variable

```sh
export PATH=$PATH:node_modules/.bin
```

## Roadmap
  * [x] TypeScript Code Standard Validation (TSLint)
  * [x] 0.3.x TypeScript Code Pretty Printer (tsc)
  * [ ] 0.4.x TypeScript Code Import Formatter (ts-format-imports)
  * [ ] 0.5.x TypeScript Code Standard Autofix (Prettier)

## Updates

### 0.3.36
  - Remove unused dependencies

### 0.3.32
  - Support for typescript@2.7.2 and tslint@5.9.1

### 0.3.30
  - Support for typescript@2.2.2 and tslint@5.0.0

### 0.3.2
  - Format ts files when you run `standard --pretty`

### 0.2.12
  - Bug fixing

### 0.2.6
  - 100% typescript!!!

### 0.2.5
  - Bug fixing

### 0.2.1
  - Add `--pretty` and `--verbose` output style from cli
  - Rewrite this project in typescript

### 0.2.0

  - Add support for Typescript 2 'include' field
  - Removed `semicolon` check because the program is not smart enough to handle all semicolon scenarios with uglifyjs

### 0.1.1

  - Imported official typescript standard rules from Microsoft repository.
  - The `file` and `exclude` from `tsconfig.json` is supported.

### About
BTW, this is my first typescript project and the reason behind this project is because I know I am going to build elegance typescript frameworks. I need a tool to make it happen.
