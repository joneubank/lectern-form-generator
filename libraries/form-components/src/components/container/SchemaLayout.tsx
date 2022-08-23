import { LecternSchema } from 'lectern';
import * as React from 'react';
import { useState } from 'react';
import SchemaForm from './SchemaForm';
import { SubmittedRecordsTable } from '../display/submittedRecords';
import { useDictionarySubmissionContext } from '../context';
import formatDataAsTsv from '../../utils/formatDataAsTsv';
import downloadFile from '../../utils/downloadFile';

const SchemaLayout = (props: { schema: LecternSchema }) => {
  const context = useDictionarySubmissionContext();
  const [showSchema, setShowSchema] = useState<boolean>(false);

  function toggleSchema() {
    setShowSchema(!showSchema);
  }

  const onSubmit = () => {
    if (context.validateUserInputs(props.schema.name)) {
      context.submitUserInputs(props.schema.name);
    }
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
          // const date = new Date();
          // const formattedDate = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay()].join('-');
          downloadFile(`${props.schema.name}.tsv`, content);
        }}
      >
        Download TSV
      </button>
      <br />
      <SchemaForm schema={props.schema} recordId={0} onSubmit={onSubmit}></SchemaForm>
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
