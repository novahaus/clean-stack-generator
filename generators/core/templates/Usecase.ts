export interface IUsecase<T = unknown> {
  execute: (...params: unknown[]) => Promise<T>;
}
