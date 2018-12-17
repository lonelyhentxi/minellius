export function enumDestructe(e: object, isString: boolean) {
  if (isString) {
    return [Object.keys(e), Object.values(e)];
  } else {
    const values = Object.values(e);
    const length = values.length / 2;
    return [values.slice(0, length), values.slice(length, length * 2)];
  }
}