import * as React from 'react';

import { LecternField } from 'lectern';
import FieldInputComponent from './FieldInputComponent';
import debounce from '../../../utils/debounce';
import { DEFAULT_DEBOUNCE_DELAY } from '.';

const IntegerInput: FieldInputComponent = (props: {
  field: LecternField;
  onUpdate: (value: number | undefined) => void;
  clearValidation?: () => void;
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

  /**
   * onChange we want to clear the validation and then run the debounced version of eventUpdate,
   *  this debounced version prevents validating immediately on every key stroke which can be disconcerting to the typer
   * @param e input event
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.clearValidation) {
      props.clearValidation();
    }
    debouncedEventUpdate(e);
  };

  /**
   * run the eventUpdate immediately and clear any pending debounced executions by invoking the debounced.now
   * @param e input event
   */
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => debouncedEventUpdate.now(e);

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
        onChange={onChange}
        onBlur={onBlur}
      ></input>
    </>
  );
};
export default IntegerInput;
