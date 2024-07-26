import { useEffect, useRef } from "react";

const useUnmount = (func) => {
  const funcRef = useRef<Function | null>(null);
  funcRef.current = func;

  useEffect(() => {
    () => () => funcRef.current();
  }, []);
};

/**
 * (fn: Function, delay: number = 400) => {
 *     let timer: ReturnType<typeof setTimeout> | null = null;
 *     return function (...args: any[]) {
 *       if (timer !== null) {
 *         clearTimeout(timer);
 *       }
 *       timer = setTimeout(() => fn.apply(fn, args), delay);
 *     };
 *   }
 */

export function useDebounceCallback(func: Function, delay: number) {
  let timer = null;
  return (...args) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func.apply(func, args), delay);
  };
}
