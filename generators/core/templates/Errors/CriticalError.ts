export class CriticalError extends Error {
  readonly error: Error;

  constructor(err: Error) {
    super("A critical error happened");
    this.error = err;
  }
}
