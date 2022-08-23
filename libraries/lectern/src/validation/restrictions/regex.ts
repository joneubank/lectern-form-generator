function validateRegex(value: string, regex: string) {
  const regExp = new RegExp(regex);
  return !!value.match(regExp);
}
export default validateRegex;
