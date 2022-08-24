import * as React from 'react';

import { LecternField, LecternFieldValue } from 'lectern';
import FieldInputComponent from './FieldInputComponent';
import { FieldInputState } from '../../../types';

const SelectInput: FieldInputComponent = (props: {
  state: FieldInputState;
  field: LecternField;
  onUpdate: (state: FieldInputState) => void;
  updateDebounce?: number;
}) => {
  const name = props.field.name;
  const required = props.field.restrictions?.required;
  const codeList = props.field.restrictions?.codeList;

  const eventUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => props.onUpdate({ value: e.target.value });

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
    </>
  );
};
export default SelectInput;
