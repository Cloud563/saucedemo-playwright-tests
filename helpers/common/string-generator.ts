type CharsetType = 'letters' | 'lettersAndDigits' | 'lettersDigitsSymbols' | 'digits';

export class RandomStringGenerator {
  private static readonly LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
  private static readonly DIGITS = '0123456789 ';
  private static readonly SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>? ';

  /**
   * Генерирует случайную строку заданной длины
   * @param length Длина строки
   * @param type Тип набора символов
   */
  static generate(length: number, type: CharsetType): string {
    if (length <= 0) {
      throw new Error('Длина строки должна быть больше 0');
    }

    let charset = '';

    switch (type) {
      case 'letters':
        charset = this.LETTERS;
        break;
      case 'digits':
        charset = this.DIGITS;
        break;
      case 'lettersAndDigits':
        charset = this.LETTERS + this.DIGITS;
        break;
      case 'lettersDigitsSymbols':
        charset = this.LETTERS + this.DIGITS + this.SYMBOLS;
        break;
      default:
        charset = this.LETTERS + this.DIGITS;
    }

    return this.generateFromCharset(charset, length);
  }

  private static generateFromCharset(charset: string, length: number): string {
    let result = '';
    const charsetLength = charset.length;

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charsetLength];
    }

    return result;
  }

  static letters(length: number): string {
    return this.generate(length, 'letters');
  }

  static digits(length: number): string {
    return this.generate(length, 'digits');
  }

  static lettersAndDigits(length: number): string {
    return this.generate(length, 'lettersAndDigits');
  }

  static allSymbols(length: number): string {
    return this.generate(length, 'lettersDigitsSymbols');
  }
}
