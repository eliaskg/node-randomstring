declare module 'randombytes' {
  function randomBytes(size: number): Buffer;
  function randomBytes(size: number, callback: (err: Error | null, buf: Buffer) => void): void;
  export default randomBytes;
}
