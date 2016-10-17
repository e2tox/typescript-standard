import { LintResult } from 'tslint/lib/lint'
import { RuleFailure } from 'tslint/lib/language/rule/rule'

export class ValidateResult {

  failureCount: number;
  failures: RuleFailure[];
  format: string | Function;
  output: string;

  constructor(result: LintResult) {
    this.failureCount = result.failureCount;
    this.failures = result.failures;
    this.format = result.format;
    this.output = result.output;
  }
}
