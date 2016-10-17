export class ValidatorOutputFormat {
  
  // values
  static PROSE_OUTPUT = new ValidatorOutputFormat('prose');
  static JSON_OUTPUT = new ValidatorOutputFormat('json');
  static PMD_OUTPUT = new ValidatorOutputFormat('pmd');
  static VERBOSE_OUTPUT = new ValidatorOutputFormat('verbose');
  static STYLISH_OUTPUT = new ValidatorOutputFormat('stylish');
  
  // boilerplate
  constructor(public value: string) {
  }
  
  toString() {
    return this.value;
  }
  
}
