export class NotFoundError extends Error {
  readonly error: Error;

  constructor(err: Error) {
    super(err.message);
    this.error = err;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
