export type MaybePromise<T> = T | PromiseLike<T>;

export interface Deferred<T, E> extends Promise<T> {
  resolve(value: MaybePromise<T>): void;
  reject(reason: E): void;
}

/**
 * Returns a promise that can be resolved or reject later
 *
 * @returns The deferred promise
 */
export function deferred<T, E>(): Deferred<T, E> {
  let reject: Deferred<T, E>['reject'] = () => {};
  let resolve: Deferred<T, E>['resolve'] = () => {};

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  }) as Deferred<T, E>;

  promise.resolve = resolve;
  promise.reject = reject;

  return promise;
}
