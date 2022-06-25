import * as React from 'react';

import { LecternField } from '../../types/lectern';
import FieldInputComponent from './FieldInputComponent';

const CodeListInput: FieldInputComponent = (props: { field: LecternField }) => {
  const name = props.field.name;
  const required = props.field.restrictions?.required;
  const codeList = props.field.restrictions?.codeList;
  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <select id={name} name={name}>
        <option disabled={required ? true : false} selected>
          {' '}
          --{' '}
        </option>
        {codeList?.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </>
  );
};
export default CodeListInput;
