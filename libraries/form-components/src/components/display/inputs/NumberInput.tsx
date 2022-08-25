import { LecternFieldValue, ValidationResponse } from 'lectern';
import * as React from 'react';

import { LecternField } from 'lectern';
import FieldInputComponent from './FieldInputComponent';
import { DEFAULT_DEBOUNCE_DELAY } from '.';
import debounce from '../../../utils/debounce';
import { FieldInputState, SchemaInputState } from '../../../types';
import FieldValidation from '../FieldValidation';

const NumberInput: FieldInputComponent = (props: {
  field: LecternField;
  state: FieldInputState;
  onUpdate: (state: LecternFieldValue) => void;
  updateDebounce?: number;
}) => {
  const name = props.field.name;

  const propsValue = props.state.value === undefined ? undefined : `${props.state.value}`;

  const eventUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // The nested ternary is built to consider empty entries as undefined, and to parse any reasonable numeric values as a float
    // while returning NaN for strings with mixed digits and other characters.
    // parseFloat on its own will return a number if the string starts with digits, even if it contains unreasonable characters like letters.
    const eventValue = e.target.value.trim();
    const value = [undefined, ''].includes(eventValue)
      ? undefined // return undefined for empty strings
      : eventValue.match(/^([-][ ]*)?[\d]+([.][\d]*)?$/) // regex for numeric only, with optional negative sign and optional decimal places
      ? parseFloat(eventValue)
      : e.target.value;

    return props.onUpdate(value);
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

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input type="string" id={name} name={name} defaultValue={propsValue} onChange={onChange} onBlur={onBlur} />
      <FieldValidation validation={props.state.validation} />
    </>
  );
};
export default NumberInput;
