import * as process from 'process'
import { lint, pretty } from '../lib'
import { expend, includesInArray, startsWith } from '../lib/utils'
import { ValidatorCallback } from '../lib/option'
import { ValidateResult } from '../lib/validator/result'

// const interceptor = process.argv[0];
// const entry = process.argv[1];
const parameters = process.argv.slice(2);
const otherParameters = parameters.filter(p => !startsWith(p, '-'));
const isPrettyFlag = includesInArray(parameters, '--pretty');
const isVerboseFlag = includesInArray(parameters, '--verbose');

let files = null;

if (parseInt(process.version.match(/v(\d+)\./)[1], 10) < 4) {
  console.error('standard: Node v4 or greater is required. `standard` did not run.');
  process.exit(1);
}

if (otherParameters.length) {
  files = expend(otherParameters);
}

let format = 'prose';
if (isPrettyFlag) {
  format = 'stylish';
}
else if (isVerboseFlag) {
  format = 'verbose';
}

let callback: ValidatorCallback = function (result: ValidateResult) {
  if (result.failureCount > 0) {
    // TSLINT not support fix
    // let fixable = false;
    // if (result.failures && result.failures.length) {
    //   result.failures.forEach(f => {
    //     if (f.hasFix()) {
    //       console.log('has fix', f);
    //       // fixable = true;
    //     }
    //   });
    // }
    console.log(result.output);
  }
  return false;
};

lint({ format, files, callback });

if (isPrettyFlag) {
  pretty({ files });
}
