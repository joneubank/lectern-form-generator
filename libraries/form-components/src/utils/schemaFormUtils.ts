import { LecternSchema } from 'lectern';
import { SchemaInputState, SchemaRecord } from '../types';

// User Inputs setup
export function buildEmptyInputForSchema(schema: LecternSchema): SchemaInputState {
  return schema.fields.reduce<SchemaInputState>((acc, field) => {
    acc[field.name] = { value: undefined, validation: undefined };
    return acc;
  }, {});
}

export function convertInputStateToSchemaRecord(inputState: SchemaInputState): SchemaRecord {
  return Object.entries(inputState).reduce<SchemaRecord>((acc, [fieldName, fieldInputState]) => {
    acc[fieldName] = fieldInputState.value;
    return acc;
  }, {});
}
