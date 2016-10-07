import '../lib/utils/polyfill'
import {ValidatorConfigParser, Validator} from '../lib/validator'
import {IOptions} from './option'
import {ValidatorOutputFormat} from './validator/format'
import {ValidateResult} from './validator/result'

// lint typescript files
export function lint(opts: IOptions = {}): Array<ValidateResult> {

  const parser = new ValidatorConfigParser();
  const files = opts.files && opts.files.length ? opts.files : parser.files();
  const options = parser.options(opts.format || ValidatorOutputFormat.JSON_OUTPUT);

  if (files && files.length && options) {
    const validator = new Validator(options);
    return files.map(function (file) {
      const result = validator.validate(file);
      if (opts.callback) {
        const stop = opts.callback(result);
        if (stop) {
          process.exit(2);
        }
      }
      return result;
    })
  }

  return [];
}

export function pretty(opts) {

}

