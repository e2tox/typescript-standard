import * as ts from 'typescript'
import * as path from 'path'
import { loadText, saveText } from '../utils/index'

export class LanguageServiceHost implements ts.LanguageServiceHost {
  files: ts.MapLike<ts.IScriptSnapshot> = {};

  addFile(fileName: string, text: string) {
    this.files[fileName] = ts.ScriptSnapshot.fromString(text);
  }

  // for ts.LanguageServiceHost
  getCompilationSettings = () => ts.getDefaultCompilerOptions();
  getScriptFileNames = () => Object.keys(this.files);
  getScriptVersion = (_fileName: string) => '0';
  getScriptSnapshot = (fileName: string) => this.files[fileName];
  getCurrentDirectory = () => process.cwd();
  getDefaultLibFileName = (options: ts.CompilerOptions) => ts.getDefaultLibFilePath(options);
}

export class Formatter {

  option: ts.FormatCodeOptions;
  ruleProvider: any;

  constructor(option: ts.FormatCodeOptions) {
    this.option = option;
    // ts 2.2
    if ((ts as any).formatting.RulesProvider) {
      this.ruleProvider = new (ts as any).formatting.RulesProvider();
      this.ruleProvider.ensureUpToDate(this.option);
    }
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

  format(file: string): boolean {
    if (this.ruleProvider) {
      return this.format22(file);
    }
    else {
      return this.format27(file);
    }
  }

  // ts 2.7
  format27(file: string): boolean {

    const filename = path.basename(file);
    let fileContent = loadText(file);

    const host = new LanguageServiceHost();
    host.addFile(filename, fileContent);

    const languageService = ts.createLanguageService(host);
    const edits = languageService.getFormattingEditsForDocument(filename, this.option);
    edits
      .sort((a, b) => a.span.start - b.span.start)
      .reverse()
      .forEach(edit => {
        const head = fileContent.slice(0, edit.span.start);
        const tail = fileContent.slice(edit.span.start + edit.span.length);
        fileContent = `${head}${edit.newText}${tail}`;
      });

    if (edits.length) {
      saveText(file, fileContent);
      return true;
    }
    else {
      return false;
    }

  }

  // ts 2.2
  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#pretty-printer-using-the-ls-formatter
  format22(file: string): boolean {
    const filename = path.basename(file);
    const fileContent = loadText(file);
    const sourceFile = ts.createSourceFile(filename, fileContent, ts.ScriptTarget.Latest, true);

    // Get the formatting edits on the input sources
    let edits;

    if (this.ruleProvider) {
      edits = (ts as any).formatting.formatDocument(sourceFile, this.ruleProvider, this.option);
    }
    else {
      edits = (ts as any).formatting.formatDocument(sourceFile, this.option);
    }

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
