import {ILinterOptionsRaw} from 'tslint/lib/lint'
import {ValidatorOutputFormat} from './format'

export class ValidatorOption {

  configuration?: any;
  formatter?: string | Function;
  formattersDirectory?: string;
  rulesDirectory?: string | string[];

  constructor(format: ValidatorOutputFormat, configuration: any) {
    this.formatter = format.toString();
    this.configuration = configuration;
  }

  options(): ILinterOptionsRaw {
    return {
      configuration: this.configuration,
      formatter: this.formatter
    }
  }

}
