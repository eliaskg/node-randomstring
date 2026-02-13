export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

export class Charset {
  chars: string;

  constructor() {
    this.chars = '';
  }

  setType(type: CharsetType | CharsetType[]): void {
    if (Array.isArray(type)) {
      for (let i = 0; i < type.length; i++) {
        this.chars += this.getCharacters(type[i]);
      }
    } else {
      this.chars = this.getCharacters(type);
    }
  }

  getCharacters(type: CharsetType): string {
    const numbers = '0123456789';
    const charsLower = 'abcdefghijklmnopqrstuvwxyz';
    const charsUpper = charsLower.toUpperCase();
    const hexChars = 'abcdef';
    const binaryChars = '01';
    const octalChars = '01234567';

    if (type === 'alphanumeric') {
      return numbers + charsLower + charsUpper;
    } else if (type === 'numeric') {
      return numbers;
    } else if (type === 'alphabetic') {
      return charsLower + charsUpper;
    } else if (type === 'hex') {
      return numbers + hexChars;
    } else if (type === 'binary') {
      return binaryChars;
    } else if (type === 'octal') {
      return octalChars;
    } else {
      return type;
    }
  }

  removeUnreadable(): void {
    const unreadableChars = /[0OIl]/g;
    this.chars = this.chars.replace(unreadableChars, '');
  }

  setcapitalization(capitalization: string): void {
    if (capitalization === 'uppercase') {
      this.chars = this.chars.toUpperCase();
    } else if (capitalization === 'lowercase') {
      this.chars = this.chars.toLowerCase();
    }
  }

  removeDuplicates(): void {
    const charMap = this.chars.split('');
    this.chars = [...new Set(charMap)].join('');
  }
}
