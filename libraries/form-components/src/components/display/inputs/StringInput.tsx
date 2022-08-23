import * as React from 'react';

import { LecternField, LecternFieldValue } from 'lectern';

import FieldInputComponent from './FieldInputComponent';
import debounce from '../../../utils/debounce';
import { DEFAULT_DEBOUNCE_DELAY } from '.';

const StringInput: FieldInputComponent = (props: {
  value?: LecternFieldValue;

  field: LecternField;
  onUpdate: (value: string | undefined) => void;
  updateDebounce?: number;
}) => {
  const name = props.field.name;

  const eventUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdate(e.target.value);
  };
  const debouncedEventUpdate = debounce(eventUpdate, props.updateDebounce || DEFAULT_DEBOUNCE_DELAY);

  const value = props.value === undefined ? '' : `${props.value}`;

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input
        type="text"
        id={name}
        name={name}
        defaultValue={value}
        onChange={debouncedEventUpdate}
        onBlur={debouncedEventUpdate.now}
      ></input>
    </>
  );
};
export default StringInput;
