import * as ts from 'typescript'
import { findup, load } from '../utils'

export class FormatterConfigParser {

  option(): ts.FormatCodeOptions {
    const defaultTSFormatConfig = findup('tsconfig.json');
    if (!defaultTSFormatConfig) {
      return null;
    }
    const options = load(defaultTSFormatConfig);
    return options.formatterOptions as ts.FormatCodeOptions;
  }

}
