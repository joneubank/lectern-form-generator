import * as React from 'react';
import { createContext, useState, ReactElement } from 'react';
import {
  LecternDictionary,
  LecternField,
  LecternFieldValue,
  LecternSchema,
  validateField,
  ValidationResponse,
} from 'lectern';

import { SchemaInputState, SchemaRecord } from '../../types';
import { buildEmptyInputForSchema, convertInputStateToSchemaRecord } from '../../utils/schemaFormUtils';
import { LecternSchemaRecord } from 'lectern/dist/types';

type SubmittedData = Record<string, SchemaRecord[]>;
type UserInputs = Record<string, SchemaInputState>;

interface DictionarySubmissionContextInterface {
  dictionary?: LecternDictionary;
  submittedData: SubmittedData;

  userInputs: UserInputs;
  updateUserInput: (
    schema: string,
    field: string,
    value: LecternFieldValue,
    userInputs: SchemaInputState,
  ) => ValidationResponse | undefined;
  validateUserInputs: (schema: string) => boolean;
  submitUserInputs: (schema: string) => void;
  resetUserInputs: (schema: string) => void;
}

export const DictionarySubmissionContext = createContext<DictionarySubmissionContextInterface>({
  submittedData: {},
  userInputs: {},
  updateUserInput: () => undefined,
  validateUserInputs: () => false,
  submitUserInputs: () => {},
  resetUserInputs: () => {},
});

export function useDictionarySubmissionContext() {
  return React.useContext(DictionarySubmissionContext);
}

export function DictionarySubmissionProvider(props: {
  children?: React.ReactNode;
  dictionary: LecternDictionary;
}): ReactElement<DictionarySubmissionContextInterface> {
  // Submitted Data Setup
  const initialSubmittedData: SubmittedData = props.dictionary.schemas.reduce<SubmittedData>((acc, schema) => {
    acc[schema.name] = [];
    return acc;
  }, {});
  const [submittedData, setSubmittedData] = useState<SubmittedData>(initialSubmittedData);

  // #### Setup for userInputs
  const getEmptyInputForSchema = (schemaName: string): SchemaInputState | undefined => {
    const schema = props.dictionary.schemas.find((schema) => schema.name === schemaName);
    return !!schema ? buildEmptyInputForSchema(schema) : undefined;
  };
  const initialUserInputs: UserInputs = props.dictionary.schemas.reduce<UserInputs>((acc, schema) => {
    acc[schema.name] = getEmptyInputForSchema(schema.name) || {};
    return acc;
  }, {});

  const [userInputs, setUserInputs] = useState<UserInputs>(initialUserInputs);

  // #### Utilty methods
  const findSchema = (schemaName: string): LecternSchema | undefined =>
    props.dictionary.schemas.find((schema) => schema.name === schemaName);
  const findField = (schemaName: string, fieldName: string): LecternField | undefined =>
    findSchema(schemaName)?.fields.find((field) => field.name === fieldName);

  const updateUserInput = (
    schemaName: string,
    fieldName: string,
    value: LecternFieldValue,
    userInputState: SchemaInputState,
  ): ValidationResponse | undefined => {
    const field = findField(schemaName, fieldName);
    const schemaRecord = Object.entries(userInputState).reduce<LecternSchemaRecord>((acc, [key, fieldInputState]) => {
      acc[key] = fieldInputState.value;
      return acc;
    }, {});
    if (field && schemaRecord) {
      const validation = validateField(field, value, schemaRecord);
      const updatedUserInputs = { ...userInputs };
      updatedUserInputs[schemaName][fieldName] = { value, validation };
      setUserInputs(updatedUserInputs);
      return validation;
    } else {
      // TODO: Handle context calls for unknown schemas and fields
      console.error(`Unknown schema and field combination provided: ${schemaName}.${fieldName}`);
      return;
    }
  };

  const validateUserInputs = (schema: string) => {
    const record = userInputs[schema];
    const recordEntries = Object.entries(record);

    const results = recordEntries.map(([field, state]) =>
      updateUserInput(schema, field, state.value, userInputs[schema]),
    );
    return results.every((result) => result?.valid);
  };

  const submitUserInputs = (schema: string) => {
    const record = userInputs[schema];
    submittedData[schema] = [...submittedData[schema], convertInputStateToSchemaRecord(record)];
    setSubmittedData({ ...submittedData });
    resetUserInputs(schema);
  };

  const resetUserInputs = (schema: string) => {
    const emptyInput = getEmptyInputForSchema(schema);
    if (emptyInput) {
      userInputs[schema] = emptyInput;
      setUserInputs(userInputs);
    }
  };

  const contextValues: DictionarySubmissionContextInterface = {
    dictionary: props.dictionary,
    submittedData,
    userInputs,
    updateUserInput,
    validateUserInputs,
    submitUserInputs,
    resetUserInputs,
  };

  return (
    <DictionarySubmissionContext.Provider value={contextValues}>{props.children}</DictionarySubmissionContext.Provider>
  );
}
