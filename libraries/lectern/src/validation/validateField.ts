import { LecternField, LecternFieldTypes } from '../types';
import {
  ValidationResponse,
  successfulValidationResponse,
  failedValidationResponse,
  ValidationFailureReasons,
  ValidationFailure,
} from './responses';
import validateCodeList from './restrictions/codeList';
import validateRange from './restrictions/range';
import validateRegex from './restrictions/regex';

/*
 * These validations have all been written before, but in a client that is not suitable for use in the browser:
 * https://github.com/overture-stack/js-lectern-client/blob/master/src/schema-functions.ts
 */

function isBoolean(input: any): input is boolean {
  return typeof input === 'boolean';
}

function isInteger(input: any): input is number {
  return typeof input === 'number' && input % 1 === 0;
}

function isNumber(input: any): input is number {
  return typeof input === 'number';
}

function isString(input: any): input is string {
  return typeof input === 'string';
}

function validateBooleanField(value: boolean, field: LecternField): ValidationResponse {
  // The only boolean restriction is 'required', which is not handled here.
  // Always returns true :)
  // Method provided for code consistency
  return successfulValidationResponse();
}

function validateIntegerField(value: number, field: LecternField): ValidationResponse {
  const failures: ValidationFailure[] = [];
  // script
  // code list
  if (field.restrictions?.codeList && !validateCodeList(value, field.restrictions.codeList)) {
    failures.push(ValidationFailureReasons.codeList());
  }
  // range
  if (field.restrictions?.range && !validateRange(value, field.restrictions.range)) {
    failures.push(ValidationFailureReasons.range());
  }
  //
  return failures.length ? failedValidationResponse(...failures) : successfulValidationResponse();
}

function validateNumberField(value: number, field: LecternField): ValidationResponse {
  const failures: ValidationFailure[] = [];
  // script
  // code list
  if (field.restrictions?.codeList && !validateCodeList(value, field.restrictions?.codeList)) {
    failures.push(ValidationFailureReasons.codeList());
  }
  // range
  if (field.restrictions?.range && !validateRange(value, field.restrictions.range)) {
    failures.push(ValidationFailureReasons.range());
  }
  return failures.length ? failedValidationResponse(...failures) : successfulValidationResponse();
}
function validateStringField(value: string, field: LecternField): ValidationResponse {
  const failures: ValidationFailure[] = [];
  // script
  // code list
  if (field.restrictions?.codeList && !validateCodeList(value, field.restrictions?.codeList)) {
    failures.push(ValidationFailureReasons.codeList());
  }
  // regex
  if (field.restrictions?.regex && !validateRegex(value, field.restrictions?.regex)) {
    failures.push(ValidationFailureReasons.codeList());
  }
  return failures.length ? failedValidationResponse(...failures) : successfulValidationResponse();
}

function validateField(value: any, field: LecternField): ValidationResponse {
  // undefined is allowed if field is not required, regardless of type:
  if (value === undefined && !field.restrictions?.required) {
    return failedValidationResponse(ValidationFailureReasons.requiredField());
  }

  // Different validations performed based on the field valueType
  const expectedType = field.valueType;
  switch (expectedType) {
    case LecternFieldTypes.Boolean:
      return isBoolean(value)
        ? validateBooleanField(value, field)
        : failedValidationResponse(ValidationFailureReasons.invalidType(expectedType));

    case LecternFieldTypes.Integer:
      return isInteger(value)
        ? validateIntegerField(value, field)
        : failedValidationResponse(ValidationFailureReasons.invalidType(expectedType));

    case LecternFieldTypes.Number:
      return isNumber(value)
        ? validateNumberField(value, field)
        : failedValidationResponse(ValidationFailureReasons.invalidType(expectedType, typeof value));

    case LecternFieldTypes.String:
      return isString(value)
        ? validateStringField(value, field)
        : failedValidationResponse(ValidationFailureReasons.invalidType(expectedType, typeof value));
  }
}

export default validateField;
