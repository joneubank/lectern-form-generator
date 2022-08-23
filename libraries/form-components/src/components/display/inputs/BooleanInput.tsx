import * as React from 'react';

import { LecternField, LecternFieldValue } from 'lectern';
import FieldInputComponent from './FieldInputComponent';

const BooleanInput: FieldInputComponent = (props: {
  value?: LecternFieldValue;
  field: LecternField;
  onUpdate: (value: boolean | undefined) => void;
}) => {
  const name = props.field.name;
  const required = props.field.restrictions?.required;

  const eventUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    props.onUpdate(value === 'true' ? true : value === 'false' ? false : undefined);
  };
  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <select
        id={name}
        name={name}
        defaultValue={props.value === true ? 'true' : props.value === false ? 'false' : undefined}
        onChange={eventUpdate}
        onBlur={eventUpdate}
      >
        {!required && <option value={''}> -- </option>}
        <option value="false">False</option>
        <option value="true">True</option>
      </select>
    </>
  );
};
export default BooleanInput;
