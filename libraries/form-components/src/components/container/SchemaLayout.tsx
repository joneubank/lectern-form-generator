import { LecternSchema } from 'lectern';
import * as React from 'react';
import { useState } from 'react';
import SchemaForm from './SchemaForm';
import { SubmittedRecordsTable } from '../display/submittedRecords';
import { useDictionarySubmissionContext } from '../context';
import formatDataAsTsv from '../../utils/formatDataAsTsv';
import downloadFile from '../../utils/downloadFile';
import { SchemaInputState } from '../../types';
import { convertInputStateToSchemaRecord } from '../../utils/schemaFormUtils';

const SchemaLayout = (props: { schema: LecternSchema }) => {
  const context = useDictionarySubmissionContext();
  const [showSchema, setShowSchema] = useState<boolean>(false);

  function toggleSchema() {
    setShowSchema(!showSchema);
  }

  const onSubmit = (userInputs: SchemaInputState) => {
    context.submitSchemaRecord(props.schema.name, convertInputStateToSchemaRecord(userInputs));
  };

  return (
    <>
      <h1>{props.schema.name}</h1>
      <p>{props.schema.description}</p>
      <SubmittedRecordsTable
        schema={props.schema}
        records={context.submittedData[props.schema.name] || []}
      ></SubmittedRecordsTable>
      <button
        onClick={() => {
          const content = formatDataAsTsv(props.schema, context.submittedData[props.schema.name]);
          // TODO: custom method should be available to customize the name formatting
          downloadFile(`${props.schema.name}.tsv`, content);
        }}
      >
        Download TSV
      </button>
      <br />
      <SchemaForm schema={props.schema} onSubmit={onSubmit}></SchemaForm>
      <br />
      <button onClick={toggleSchema}>{showSchema ? 'Hide' : 'Show'} Schema</button>
      <br />
      {showSchema && (
        <pre>
          <code>{JSON.stringify(props.schema, null, 2)}</code>
        </pre>
      )}
    </>
  );
};

export default SchemaLayout;
