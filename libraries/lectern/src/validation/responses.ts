import { LecternRangeRestriction } from '../types';

export type ValidationFailure = {
  restriction: {
    name: RestrictionName;
    value: any;
  };
  message: string;
};

export type ValidationResponse = {
  valid: boolean;
  failures?: ValidationFailure[];
};

export enum RestrictionName {
  CodeList = 'codeList',
  Range = 'range',
  RegEx = 'regex',
  Required = 'required',
  ValueType = 'valueType', // In lectern this isn't listed in restrictions, but must still be validated
}

const failureReason = (
  restrictionName: RestrictionName,
  restrictionValue: any,
  message: string,
): ValidationFailure => ({
  restriction: { name: restrictionName, value: restrictionValue },
  message,
});

export const ValidationFailureReasons: Record<string, (...args: any[]) => ValidationFailure> = {
  codeList: (codeList: string[] | number[]) =>
    failureReason(RestrictionName.CodeList, codeList, 'Field value must be from the required list.'),
  invalidType: (expectedType: string) =>
    failureReason(RestrictionName.ValueType, expectedType, `Field value must be of type '${expectedType}'.`),
  range: (range: LecternRangeRestriction) =>
    failureReason(RestrictionName.Range, range, 'Field value must be within the restricted range.'),
  regex: (regex: string) => failureReason(RestrictionName.RegEx, regex, 'Field value must match regular expression.'),
  requiredField: () => failureReason(RestrictionName.Required, true, `Field value is required.`),
};

export const failedValidationResponse = (...failures: ValidationFailure[]) => ({
  valid: false,
  failures,
});

export const successfulValidationResponse = () => ({ valid: true });
