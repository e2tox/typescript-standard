import { Formatters } from 'tslint'

export class ValidatorOutputFormat {

  // values
  static PROSE_OUTPUT = Formatters.ProseFormatter;
  static JSON_OUTPUT = Formatters.JsonFormatter;
  static PMD_OUTPUT = Formatters.PmdFormatter;
  static VERBOSE_OUTPUT = Formatters.VerboseFormatter;
  static STYLISH_OUTPUT = Formatters.StylishFormatter;
  static FILELIST_OUTPUT = Formatters.FileslistFormatter;

  static getFormatter(formatter: string): Function {
    switch(formatter) {
      case 'prose':
        return ValidatorOutputFormat.PROSE_OUTPUT;
      case 'json':
        return ValidatorOutputFormat.JSON_OUTPUT;
      case 'pmg':
        return ValidatorOutputFormat.PMD_OUTPUT;
      case 'verbose':
        return ValidatorOutputFormat.VERBOSE_OUTPUT;
      case 'stylish':
        return ValidatorOutputFormat.STYLISH_OUTPUT;
      case 'filelist':
        return ValidatorOutputFormat.FILELIST_OUTPUT;
      default:
        return ValidatorOutputFormat.JSON_OUTPUT;
    }
  }
  
}
