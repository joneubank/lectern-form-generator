import * as React from 'react';

import { LecternField, LecternFieldValue, ValidationResponse } from 'lectern';
import FieldInputComponent from './FieldInputComponent';
import { FieldInputState, SchemaInputState } from '../../../types';
import FieldValidation from '../FieldValidation';

const BooleanInput: FieldInputComponent = (props: {
  field: LecternField;
  state: FieldInputState;
  onUpdate: (state: LecternFieldValue) => void;
  updateDebounce?: number;
}) => {
  const name = props.field.name;
  const required = props.field.restrictions?.required;

  const propsValue = props.state.value === true ? 'true' : props.state.value === false ? 'false' : undefined;

  const eventUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventValue = e.target.value;
    const value = eventValue === 'true' ? true : eventValue === 'false' ? false : undefined;

    props.onUpdate(value);
  };
  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <select id={name} name={name} defaultValue={propsValue} onChange={eventUpdate} onBlur={eventUpdate}>
        {!required && <option value={''}> -- </option>}
        <option value="false">False</option>
        <option value="true">True</option>
      </select>
      <FieldValidation validation={props.state.validation} />
    </>
  );
};
export default BooleanInput;
