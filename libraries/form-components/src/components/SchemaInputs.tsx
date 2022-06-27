import * as React from 'react';

import { LecternSchema } from 'lectern';
import SchemaFieldInput from './FieldInput';

const SchemaInputs = (props: { schema: LecternSchema }): JSX.Element => {
  return (
    <>
      {props.schema.fields.map((field) => (
        <>
          <SchemaFieldInput field={field} />
          <br />
        </>
      ))}
    </>
  );
};

export default SchemaInputs;
