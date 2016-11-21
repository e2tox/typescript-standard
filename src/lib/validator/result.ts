import { LintResult } from 'tslint'
import { RuleFailure } from 'tslint'

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
