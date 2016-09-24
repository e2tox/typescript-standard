import {lint} from '../lib'
import {ValidatorOutputFormat} from '../lib/validator/format'
import * as process from 'process'
import {expend} from '../lib/utils'
import {ValidatorCallback} from '../lib/option'
import {ValidateResult} from '../lib/validator/result'

// const intercepter = process.argv[0];
// const entry = process.argv[1];
const parameters = process.argv.slice(2);
const otherParameters = parameters.filter(p => !p.startsWith('-'));
const isPrettyFlag = parameters.includes('--pretty');
const isVerboseFlag = parameters.includes('--verbose');

let files = null;

if (parseInt(process.version.match(/v(\d+)\./)[1], 10) < 4) {
  console.error('standard: Node v4 or greater is required. `standard` did not run.');
  process.exit(1);
}

if (otherParameters.length) {
  files = expend(otherParameters);
}

let format = ValidatorOutputFormat.PROSE_OUTPUT;
if (isPrettyFlag) {
  format = ValidatorOutputFormat.STYLISH_OUTPUT;
}
else if (isVerboseFlag) {
  format = ValidatorOutputFormat.VERBOSE_OUTPUT;
}

let callback: ValidatorCallback = function (result: ValidateResult) {
  if (result.failureCount > 0) {
    // let fixable = false;
    // if (result.failures && result.failures.length) {
    //   result.failures.forEach(f => {
    //     if (f.hasFix()) {
    //       fixable = true;
    //     }
    //   });
    //   console.log('TSLINT NOT SUPPORT THIS YET');
    // }
    console.log(result.output);
  }
  return false;
};

lint({format, files, callback});
