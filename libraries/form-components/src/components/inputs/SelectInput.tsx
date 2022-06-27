import * as React from 'react';

import { LecternField } from 'lectern';
import FieldInputComponent from './FieldInputComponent';

const CodeListInput: FieldInputComponent = (props: { field: LecternField }) => {
  const name = props.field.name;
  const required = props.field.restrictions?.required;
  const codeList = props.field.restrictions?.codeList;
  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <select id={name} name={name} defaultValue={undefined}>
        <option disabled={required ? true : false}> -- </option>
        {codeList?.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </>
  );
};
export default CodeListInput;
