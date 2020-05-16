/* eslint-disable no-use-before-define, max-len, class-methods-use-this */
interface aggregateFn<T> {
  (...args: T[]): T;
}

interface curryFn<T> extends aggregateFn<T> {
  (...args: T[]): curryFn<T>;
}

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry<T>(fn: aggregateFn<T>): curryFn<T> {
  const arity = fn.length;
  return function $curry(...args: any[]) : curryFn<any> | any {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

const add = curry((a: number, b: number) => b + a)
const addTen = add(10)
console.log(addTen(1))
