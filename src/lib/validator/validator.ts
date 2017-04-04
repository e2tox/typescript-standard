import { Linter } from 'tslint'
import * as fs from 'fs'
import { ValidatorOption } from './option'
import { ValidateResult } from './result'

// integrate tslint to validate ts file
export class Validator {

  validatorOption: ValidatorOption;

  constructor(validatorOption: ValidatorOption) {
    this.validatorOption = validatorOption;
  }

  validate(file: string): ValidateResult {
    if (!fs.existsSync(file)) {
      console.error(`Unable to open file: ${file}`);
      process.exit(1);
    }
    const contents = fs.readFileSync(file, 'utf8');
    const linter = new Linter(this.validatorOption.options());
    linter.lint(file, contents, this.validatorOption.configuration);
    const results = linter.getResult();
    return new ValidateResult(results);
  }

}
