export class ValidatorOutputFormat {

  static getFormatter(formatter: string): string {
    if (formatter) {
      return formatter
    }
    else {
      return 'json';
    }
  }

}
