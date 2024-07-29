import { useCallback, useEffect, useRef, useState } from "react";

const useUnmount = (func) => {
  const funcRef = useRef<Function | null>(null);
  funcRef.current = func;

  useEffect(() => {
    () => () => funcRef.current();
  }, []);
};

export function useDebounceCallback(func: Function, delay: number) {
  let timer = null;
  const run = useCallback(
    (...args) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => func.apply(func, args), delay);
    },
    [delay, func],
  );

  const cancel = () => timer && clearTimeout(timer);

  useUnmount(cancel);

  return { run, cancel };
}
