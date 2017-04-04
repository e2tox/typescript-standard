import { FormatterFunction, Formatters } from 'tslint'

export class ValidatorOutputFormat {

  static getFormatter(formatter: string): string | FormatterFunction {
    if (formatter) {
      return formatter
    }
    else {
      return 'json';
    }
  }

}
