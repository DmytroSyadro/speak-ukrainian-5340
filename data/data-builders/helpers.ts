export class DataHelpers {
  static getUniqueSuffix(): string {
    return Date.now().toString().slice(-6);
  }
}
