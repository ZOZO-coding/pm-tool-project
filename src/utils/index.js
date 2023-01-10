// convert 0 to true instead of a falsy value, so that we don't delete the key when value is 0
export const isFalsy = (value) => (value === 0 ? false : !value);

// It's not best practice to change the object in a function
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
