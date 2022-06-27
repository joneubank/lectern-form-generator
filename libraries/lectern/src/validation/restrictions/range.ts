import { LecternRangeRestriction } from '../../types';
function validateRange(value: number, range: LecternRangeRestriction) {
  return (
    (range.min === undefined || value >= range.min) &&
    (range.exclusiveMin === undefined || value > range.exclusiveMin) &&
    (range.max === undefined || value <= range.max) &&
    (range.exclusiveMax === undefined || value < range.exclusiveMax)
  );
}
export default validateRange;
