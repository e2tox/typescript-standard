import { ILinterOptions } from 'tslint'
import { ValidatorOutputFormat } from './format';
import { IConfigurationFile } from 'tslint/lib/configuration';

export class ValidatorOption {

  configuration?: IConfigurationFile;
  formatter?: string;
  formattersDirectory?: string;
  rulesDirectory?: string | string[];

  constructor(format: string, configuration: IConfigurationFile) {
    this.formatter = ValidatorOutputFormat.getFormatter(format);
    this.configuration = configuration;
  }

  options(): ILinterOptions {
    return {
      fix: true,
      formatter: this.formatter
      // formattersDirectory?: string,
      // rulesDirectory?: string | string[],
    };
  }

}
