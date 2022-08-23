import { LecternSchema } from 'lectern';
import * as React from 'react';
import SchemaFieldInput from '../container/FieldInput';

const SchemaForm = (props: { schema: LecternSchema; recordId: number; onSubmit: () => void }) => {
  return (
    <>
      {props.schema.fields.map((field, fieldIndex) => {
        return <SchemaFieldInput key={fieldIndex} schema={props.schema} field={field} />;
      })}
      <button onClick={props.onSubmit}>Submit</button>
    </>
  );
};

export default SchemaForm;
