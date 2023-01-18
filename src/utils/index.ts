import { useEffect, useState } from "react";

// convert 0 to true instead of a falsy value, so that we don't delete the key when value is 0
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// *It's best practice to not change the object in a function, instead, create a copy
// This function will first check if there're any values in the params such as name, personId, if there're no values then just delete that key in the object. The function also take care of when value is 0
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// *taking in a value (which is going to be the param), and basically just clearing out the previous calls, and only return the last fetch call.
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // everytime value is changing, we will set a new timeout
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // cleaner
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
