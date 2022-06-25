import * as React from 'react';

import { LecternField } from '../../types/lectern';
import FieldInputComponent from './FieldInputComponent';

const StringInput: FieldInputComponent = (props: { field: LecternField }) => {
  const name = props.field.name;

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input type="text" id={name} name={name}></input>
    </>
  );
};
export default StringInput;
