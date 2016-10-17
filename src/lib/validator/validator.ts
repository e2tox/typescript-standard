import * as tslint from 'tslint'
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
    const linter = new tslint(file, contents, this.validatorOption.options());
    return new ValidateResult(linter.lint());
  }
  
}
