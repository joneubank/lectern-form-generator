import * as React from 'react';

import { LecternField } from '../../types/lectern';
import FieldInputComponent from './FieldInputComponent';

const IntegerInput: FieldInputComponent = (props: { field: LecternField }) => {
  const name = props.field.name;

  const range = props.field.restrictions?.range || {};
  const min = range.exclusiveMin ? range.exclusiveMin + 1 : range.min;
  const max = range.exclusiveMax ? range.exclusiveMax + 1 : range.max;

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input type="number" id={name} name={name} min={min} max={max} step={1}></input>
    </>
  );
};
export default IntegerInput;
