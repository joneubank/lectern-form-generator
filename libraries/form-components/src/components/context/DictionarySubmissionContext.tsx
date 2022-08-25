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
  dictionary: LecternDictionary;
  submittedData: SubmittedData;
  submitSchemaRecord: (schema: string, schemaRecord: SchemaRecord) => void;
}

export const DictionarySubmissionContext = createContext<DictionarySubmissionContextInterface>({
  dictionary: { _id: '', createdAt: '', name: '', schemas: [], updatedAt: '', version: '' },
  submittedData: {},
  submitSchemaRecord: () => {},
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

  // #### Utilty methods
  const findSchema = (schemaName: string): LecternSchema | undefined =>
    props.dictionary.schemas.find((schema) => schema.name === schemaName);
  const findField = (schemaName: string, fieldName: string): LecternField | undefined =>
    findSchema(schemaName)?.fields.find((field) => field.name === fieldName);

  const submitSchemaRecord = (schema: string, schemaRecord: SchemaRecord) => {
    submittedData[schema] = [...submittedData[schema], schemaRecord];
    setSubmittedData({ ...submittedData });
  };

  const contextValues: DictionarySubmissionContextInterface = {
    dictionary: props.dictionary,
    submittedData,
    submitSchemaRecord,
  };

  return (
    <DictionarySubmissionContext.Provider value={contextValues}>{props.children}</DictionarySubmissionContext.Provider>
  );
}
