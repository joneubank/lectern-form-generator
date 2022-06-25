import * as React from 'react';

import { LecternField } from '../../types/lectern';
import FieldInputComponent from './FieldInputComponent';

const BooleanInput: FieldInputComponent = (props: { field: LecternField }) => {
  const name = props.field.name;
  const required = props.field.restrictions?.required;
  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <select id={name} name={name}>
        <option disabled={required ? true : false} selected>
          {' '}
          --{' '}
        </option>
        <option value="false">False</option>
        <option value="true">True</option>
      </select>
    </>
  );
};
export default BooleanInput;
