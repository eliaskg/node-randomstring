# node-randomstring

[![Build Status](https://travis-ci.org/klughammer/node-randomstring.svg?branch=master)](https://travis-ci.org/klughammer/node-randomstring) [![Download Stats](https://img.shields.io/npm/dm/randomstring.svg)](https://github.com/klughammer/node-randomstring)

Library to help you create random strings.

## Installation

To install randomstring, use [npm](http://github.com/npm/npm):

```
npm install randomstring
```

## Usage

```javascript
// CommonJS
const randomstring = require("randomstring");

// ES Modules
import randomstring from "randomstring";

randomstring.generate();
// >> "XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT"

randomstring.generate(7);
// >> "xqm5wXX"

randomstring.generate({
  length: 12,
  charset: 'alphabetic'
});
// >> "AqoTIzKurxJi"

randomstring.generate({
  charset: 'abc'
});
// >> "accbaabbbbcccbccccaacacbbcbbcbbc"

randomstring.generate({
  charset: ['numeric', '!']
});
// >> "145132!87663611567!2486211!07856"

randomstring.generate({
  charset: 'abc'
}, cb);
// >> "cb(generatedString) {}"

```

TypeScript types are included out of the box — no need to install `@types` separately.

## API

`randomstring.`

- `generate(options, cb)`
  - `options`
    - `length` - the length of the random string. (default: 32) [OPTIONAL]
    - `readable` - exclude poorly readable chars: 0OIl. (default: false) [OPTIONAL]
    - `charset` - define the character set for the string. (default: 'alphanumeric') [OPTIONAL]
      - `alphanumeric` - [0-9 a-z A-Z]
      - `alphabetic` - [a-z A-Z]
      - `numeric` - [0-9]
      - `hex` - [0-9 a-f]
      - `binary` - [01]
      - `octal` - [0-7]
      - `custom` - any given characters
      - `[]` -  An array of any above
    - `capitalization` - define whether the output should be lowercase / uppercase only. (default: null) [OPTIONAL]
      - `lowercase`
      - `uppercase`
  - `cb` - Optional.  If provided uses async version of `crypto.randombytes`

## Command Line Usage

    $ npm install -g randomstring

    $ randomstring
    > sKCx49VgtHZ59bJOTLcU0Gr06ogUnDJi

    $ randomstring 7
    > CpMg433

    $ randomstring length=24 charset=github readable
    > hthbtgiguihgbuttuutubugg

## Development

```
npm install
npm run build
npm test
```

## LICENSE

node-randomstring is licensed under the MIT license.
