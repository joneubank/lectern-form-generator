import * as React from 'react';

import { LecternField, LecternFieldValue } from 'lectern';

import FieldInputComponent from './FieldInputComponent';
import debounce from '../../../utils/debounce';
import { DEFAULT_DEBOUNCE_DELAY } from '.';
import { FieldInputState } from '../../../types';

const StringInput: FieldInputComponent = (props: {
  state: FieldInputState;
  field: LecternField;
  onUpdate: (state: FieldInputState) => void;
  updateDebounce?: number;
}) => {
  const eventUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdate({ value: e.target.value });
  };
  const debouncedEventUpdate = React.useCallback(
    debounce(eventUpdate, props.updateDebounce || DEFAULT_DEBOUNCE_DELAY),
    [props.updateDebounce || DEFAULT_DEBOUNCE_DELAY],
  );

  /**
   * onChange we want to clear the validation and then run the debounced version of eventUpdate,
   *  this debounced version prevents validating immediately on every key stroke which can be disconcerting to the typer
   * @param e input event
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (props.clearValidation) {
    //   props.clearValidation();
    // }
    debouncedEventUpdate(e);
  };

  /**
   * run the eventUpdate immediately and clear any pending debounced executions by invoking the debounced.now
   * @param e input event
   */
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => debouncedEventUpdate.now(e);

  const name = props.field.name;
  const value = props.state.value === undefined ? '' : `${props.state.value}`;

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input type="text" id={name} name={name} defaultValue={value} onChange={onChange} onBlur={onBlur}></input>
    </>
  );
};
export default StringInput;
