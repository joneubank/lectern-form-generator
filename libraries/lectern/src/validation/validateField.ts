import { LecternField, LecternFieldTypes, LecternFieldValue, LecternSchemaRecord } from '../types';
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
import validateScript from './restrictions/script';

/*
 * These validations have all been written before, but in a client that is not suitable for use in the browser:
 * https://github.com/overture-stack/js-lectern-client/blob/master/src/schema-functions.ts
 */

function isBoolean(input: unknown): input is boolean {
  return typeof input === 'boolean';
}

function isInteger(input: unknown): input is number {
  return typeof input === 'number' && input !== NaN && input !== Infinity && input % 1 === 0;
}

function isNumber(input: unknown): input is number {
  const type = typeof input === 'number';
  const output = type && !isNaN(input);
  return output;
}

function isString(input: unknown): input is string {
  return typeof input === 'string';
}

function validateBooleanField(value: boolean, field: LecternField, record: LecternSchemaRecord): ValidationResponse {
  // The only boolean restriction is 'required', which is not handled here.
  // Always returns true :)
  // Method provided for code consistency
  return successfulValidationResponse();
}

function validateIntegerField(value: number, field: LecternField, record: LecternSchemaRecord): ValidationResponse {
  const failures: ValidationFailure[] = [];

  // code list
  if (field.restrictions?.codeList && !validateCodeList(value, field.restrictions.codeList)) {
    failures.push(ValidationFailureReasons.codeList());
  }
  // range
  if (field.restrictions?.range && !validateRange(value, field.restrictions.range)) {
    failures.push(ValidationFailureReasons.range());
  }
  // script

  return failures.length ? failedValidationResponse(...failures) : successfulValidationResponse();
}

function validateNumberField(value: number, field: LecternField, record: LecternSchemaRecord): ValidationResponse {
  const failures: ValidationFailure[] = [];

  // code list
  if (field.restrictions?.codeList && !validateCodeList(value, field.restrictions?.codeList)) {
    failures.push(ValidationFailureReasons.codeList());
  }
  // range
  if (field.restrictions?.range && !validateRange(value, field.restrictions.range)) {
    failures.push(ValidationFailureReasons.range());
  }
  // script

  return failures.length ? failedValidationResponse(...failures) : successfulValidationResponse();
}
function validateStringField(value: string, field: LecternField, record: LecternSchemaRecord): ValidationResponse {
  const failures: ValidationFailure[] = [];

  // code list
  if (field.restrictions?.codeList && !validateCodeList(value, field.restrictions?.codeList)) {
    failures.push(ValidationFailureReasons.codeList());
  }
  // regex
  if (field.restrictions?.regex && !validateRegex(value, field.restrictions?.regex)) {
    failures.push(ValidationFailureReasons.regex(field.restrictions?.regex));
  }
  // script
  if (field.restrictions?.script?.length) {
    const scripts = field.restrictions.script || [];
    scripts.forEach((script) => {
      const result = validateScript(value, script, { record, field });
      if (!result.valid) {
        failures.push(ValidationFailureReasons.script(script, result.message));
      }
    });
  }

  return failures.length ? failedValidationResponse(...failures) : successfulValidationResponse();
}

function validateField(field: LecternField, value: LecternFieldValue, record: LecternSchemaRecord): ValidationResponse {
  // undefined is allowed if field is not required, regardless of type:
  if (value === undefined || value === '') {
    if (field.restrictions?.required) {
      return failedValidationResponse(ValidationFailureReasons.requiredField());
    }
    return successfulValidationResponse();
  }

  // Function only continues here if value is present (we have passed any required restrictions)

  // Select validation based on expected value type for field
  const expectedType = field.valueType;
  switch (expectedType) {
    case LecternFieldTypes.Boolean:
      return isBoolean(value)
        ? validateBooleanField(value, field, record)
        : failedValidationResponse(ValidationFailureReasons.invalidType(expectedType));

    case LecternFieldTypes.Integer:
      return isInteger(value)
        ? validateIntegerField(value, field, record)
        : failedValidationResponse(ValidationFailureReasons.invalidType(expectedType));

    case LecternFieldTypes.Number:
      return value !== NaN && isNumber(value)
        ? validateNumberField(value, field, record)
        : failedValidationResponse(ValidationFailureReasons.invalidType(expectedType, typeof value));

    case LecternFieldTypes.String:
      return isString(value)
        ? validateStringField(value, field, record)
        : failedValidationResponse(ValidationFailureReasons.invalidType(expectedType, typeof value));
  }
}

export default validateField;
