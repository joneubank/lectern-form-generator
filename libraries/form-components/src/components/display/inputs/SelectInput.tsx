import * as React from 'react';

import { LecternField, LecternFieldValue } from 'lectern';
import FieldInputComponent from './FieldInputComponent';

const SelectInput: FieldInputComponent = (props: {
  value?: LecternFieldValue;
  field: LecternField;
  onUpdate: (value: string | undefined) => void;
}) => {
  const name = props.field.name;
  const required = props.field.restrictions?.required;
  const codeList = props.field.restrictions?.codeList;

  const eventUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => props.onUpdate(e.target.value);

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <select id={name} name={name} defaultValue={`${props.value}` || ''} onChange={eventUpdate} onBlur={eventUpdate}>
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
