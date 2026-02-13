import randomBytes from 'randombytes';
import { Charset, CharsetType } from './charset';

export interface GenerateOptions {
  length?: number;
  charset?: CharsetType | CharsetType[];
  capitalization?: 'uppercase' | 'lowercase';
  readable?: boolean;
}

type GenerateCallback = (err: Error | null, result?: string) => void;

interface UnsafeBuffer {
  length: number;
  readUInt8(index: number): number;
}

function unsafeRandomBytes(length: number): UnsafeBuffer {
  const stack: number[] = [];
  for (let i = 0; i < length; i++) {
    stack.push(Math.floor(Math.random() * 255));
  }

  return {
    length,
    readUInt8(index: number) {
      return stack[index];
    },
  };
}

function safeRandomBytes(length: number): Buffer | UnsafeBuffer {
  try {
    return randomBytes(length);
  } catch (e) {
    /* React/React Native Fix + Eternal loop removed */
    return unsafeRandomBytes(length);
  }
}

function processString(
  buf: Buffer | UnsafeBuffer,
  initialString: string,
  chars: string,
  reqLen: number,
  maxByte: number,
): string {
  let string = initialString;
  for (let i = 0; i < buf.length && string.length < reqLen; i++) {
    const randomByte = buf.readUInt8(i);
    if (randomByte < maxByte) {
      string += chars.charAt(randomByte % chars.length);
    }
  }
  return string;
}

function getAsyncString(
  string: string,
  chars: string,
  length: number,
  maxByte: number,
  cb: GenerateCallback,
): void {
  randomBytes(length, function (err: Error | null, buf: Buffer) {
    if (err) {
      // Since it is waiting for entropy, errors are legit and we shouldn't just keep retrying
      cb(err);
      return;
    }
    const generatedString = processString(buf, string, chars, length, maxByte);
    if (generatedString.length < length) {
      getAsyncString(generatedString, chars, length, maxByte, cb);
    } else {
      cb(null, generatedString);
    }
  });
}

export function generate(options?: GenerateOptions | number | null, cb?: GenerateCallback): string | void {
  const charset = new Charset();

  let length: number;
  let string = '';

  // Handle options
  if (typeof options === 'object' && options !== null) {
    length = typeof options.length === 'number' ? options.length : 32;

    if (options.charset) {
      charset.setType(options.charset);
    } else {
      charset.setType('alphanumeric');
    }

    if (options.capitalization) {
      charset.setcapitalization(options.capitalization);
    }

    if (options.readable) {
      charset.removeUnreadable();
    }

    charset.removeDuplicates();
  } else if (typeof options === 'number') {
    length = options;
    charset.setType('alphanumeric');
  } else {
    length = 32;
    charset.setType('alphanumeric');
  }

  // Generate the string
  const charsLen = charset.chars.length;
  const maxByte = 256 - (256 % charsLen);

  if (!cb) {
    while (string.length < length) {
      const buf = safeRandomBytes(Math.ceil((length * 256) / maxByte));
      string = processString(buf, string, charset.chars, length, maxByte);
    }

    return string;
  }

  getAsyncString(string, charset.chars, length, maxByte, cb);
}

export default { generate };
