export const pipe =
  <T extends (...args: any) => any>(...fns: T[]) =>
  (x: Parameters<T>[0]) =>
    fns.reduce((accumulated, fn) => fn(accumulated), x);
