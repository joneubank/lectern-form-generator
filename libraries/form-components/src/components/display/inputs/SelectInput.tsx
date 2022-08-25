import * as React from 'react';

import { LecternField, LecternFieldValue, ValidationResponse } from 'lectern';
import FieldInputComponent from './FieldInputComponent';
import { FieldInputState, SchemaInputState } from '../../../types';
import FieldValidation from '../FieldValidation';

const SelectInput: FieldInputComponent = (props: {
  field: LecternField;
  state: FieldInputState;
  onUpdate: (state: LecternFieldValue) => void;
  updateDebounce?: number;
}) => {
  const name = props.field.name;
  const required = props.field.restrictions?.required;
  const codeList = props.field.restrictions?.codeList;

  const eventUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onUpdate(e.target.value);
  };

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <select
        id={name}
        name={name}
        defaultValue={`${props.state.value}` || ''}
        onChange={eventUpdate}
        onBlur={eventUpdate}
      >
        {!required && <option value={''}> -- </option>}
        {codeList?.map((value, i) => (
          <option key={`${i}`} value={value}>
            {value}
          </option>
        ))}
      </select>
      <FieldValidation validation={props.state.validation} />
    </>
  );
};
export default SelectInput;
