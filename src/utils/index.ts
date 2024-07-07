export const parseBoolean = (value: any): boolean => {
  if (value === "true" || value === 1 || value === "1" || value === true)
    return true;

  if (value === "false" || value === 0 || value === "0" || value === false)
    return false;

  if ([null, undefined, "null", "", "undefined"].includes(value)) return false;

  return !!value;
};
