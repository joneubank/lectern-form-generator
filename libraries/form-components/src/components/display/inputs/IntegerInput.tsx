import * as React from 'react';

import { LecternField } from 'lectern';
import FieldInputComponent from './FieldInputComponent';
import debounce from '../../../utils/debounce';
import { DEFAULT_DEBOUNCE_DELAY } from '.';

const IntegerInput: FieldInputComponent = (props: {
  field: LecternField;
  onUpdate: (value: number | undefined) => void;
  updateDebounce?: number;
}) => {
  const name = props.field.name;

  const range = props.field.restrictions?.range || {};
  const min = range.exclusiveMin ? range.exclusiveMin + 1 : range.min;
  const max = range.exclusiveMax ? range.exclusiveMax + 1 : range.max;

  const eventUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.onUpdate(value === undefined || value === '' ? undefined : parseFloat(value));
  };

  const debouncedEventUpdate = debounce(eventUpdate, props.updateDebounce || DEFAULT_DEBOUNCE_DELAY);

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input
        type="number"
        id={name}
        name={name}
        min={min}
        max={max}
        step={1}
        onChange={debouncedEventUpdate}
        onBlur={debouncedEventUpdate.now}
      ></input>
    </>
  );
};
export default IntegerInput;
