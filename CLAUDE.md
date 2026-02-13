# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Install dependencies:** `npm install`
- **Run all tests:** `npm test` (runs mocha)
- **Run a single test:** `npx mocha --grep "test name pattern"`

## Architecture

This is the `randomstring` npm package — a small library for generating random strings with configurable charset, length, and capitalization.

- `index.js` — Entry point, re-exports `lib/randomstring.js`
- `lib/randomstring.js` — Core `generate(options, cb)` function. Supports sync (return value) and async (callback) modes. Uses `randombytes` for crypto-safe randomness with a `Math.random()` fallback for environments where crypto is unavailable (e.g. React Native)
- `lib/charset.js` — `Charset` class that builds the character pool from named presets (`alphanumeric`, `alphabetic`, `numeric`, `hex`, `binary`, `octal`) or custom strings. Handles capitalization, readability filtering, and deduplication
- `bin/randomstring` — CLI entry point, parses `length=N`, `charset=X`, `capitalization=X`, `readable` args
- `test/index.js` — Mocha tests covering all options (sync and async), uniqueness, and distribution bias checks

The string generation works by requesting random bytes and mapping each byte to a character in the charset, skipping bytes above `maxByte` (256 - 256 % charsetLength) to avoid modulo bias. For async mode, it recursively requests more bytes until the target length is reached.
