import * as ts from 'typescript'
import * as path from 'path'
import { loadText, saveText } from '../utils/index'

export class Formatter {

  option: ts.FormatCodeOptions;
  ruleProvider: any;

  constructor(option: ts.FormatCodeOptions) {
    this.option = option;
    this.ruleProvider = new (ts as any).formatting.RulesProvider();
    this.ruleProvider.ensureUpToDate(this.option);
  }

  static applyEdits(text: string, edits: ts.TextChange[]): string {
    // Apply edits in reverse on the existing text
    let result = text;
    for (let i = edits.length - 1; i >= 0; i--) {
      const change = edits[i];
      const head = result.slice(0, change.span.start);
      const tail = result.slice(change.span.start + change.span.length)
      result = head + change.newText + tail;
    }
    return result;
  }

  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#pretty-printer-using-the-ls-formatter
  format(file: string): boolean {
    const filename = path.basename(file);
    const fileContent = loadText(file);
    const sourceFile = ts.createSourceFile(filename, fileContent, ts.ScriptTarget.Latest, true);

    // Get the formatting edits on the input sources
    const edits = (ts as any).formatting.formatDocument(sourceFile, this.ruleProvider, this.option);

    if (edits.length) {
      // Apply the edits on the input code
      const formatted = Formatter.applyEdits(fileContent, edits);
      saveText(file, formatted);
      return true;
    }
    else {
      return false;
    }

  }

}
