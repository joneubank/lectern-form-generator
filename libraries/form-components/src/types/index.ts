import { LecternFieldValue, ValidationResponse } from 'lectern';

export type SchemaRecord = Record<string, LecternFieldValue>;

export type FieldInputState = {
  value: LecternFieldValue;
  validation?: ValidationResponse;
};

export type SchemaInputState = Record<string, FieldInputState>;
