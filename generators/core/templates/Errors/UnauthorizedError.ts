export class UnauthorizedError extends Error {
  readonly error: Error;

  constructor(err: Error) {
    super(err.message);
    this.error = err;
  }
}
