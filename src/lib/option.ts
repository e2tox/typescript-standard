import { ValidateResult } from './validator/result'

export interface ValidatorCallback {
  (result: ValidateResult): boolean;
}

export interface IOptions {
  format?: string,
  files?: Array<string>
  callback?: ValidatorCallback
}
