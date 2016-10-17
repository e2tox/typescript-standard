import { ValidatorOutputFormat } from './validator/format'
import { ValidateResult } from './validator/result'

export interface ValidatorCallback {
  (result: ValidateResult): boolean;
}

export interface IOptions {
  format?: ValidatorOutputFormat
  files?: Array<string>
  callback?: ValidatorCallback
}
