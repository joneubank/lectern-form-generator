import * as React from 'react';
import { LecternSchema } from '../types/lectern';
import SchemaFieldInput from './FieldInput';

const SchemaInputs = (props: { schema: LecternSchema }): JSX.Element => {
  return (
    <>
      {props.schema.fields.map((field) => (
        <SchemaFieldInput field={field} />
      ))}
    </>
  );
};

export default SchemaInputs;
