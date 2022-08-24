import { LecternFieldValue } from 'lectern';
import * as React from 'react';

import { LecternField } from 'lectern';
import FieldInputComponent from './FieldInputComponent';
import { DEFAULT_DEBOUNCE_DELAY } from '.';
import debounce from '../../../utils/debounce';

const NumberInput: FieldInputComponent = (props: {
  value?: LecternFieldValue;

  field: LecternField;
  clearValidation?: () => void;
  onUpdate: (value: number | string | undefined) => void;
  updateDebounce?: number;
}) => {
  const name = props.field.name;

  const value = props.value === undefined ? undefined : `${props.value}`;

  const eventUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // The nested ternary is built to consider empty entries as undefined, and to parse any reasonable numeric values as a float
    // while returning NaN for strings with mixed digits and other characters.
    // parseFloat on its own will return a number if the string starts with digits, even if it contains unreasonable characters like letters.
    const value = e.target.value.trim();
    return props.onUpdate(
      [undefined, ''].includes(e.target.value)
        ? undefined // return undefined for empty strings
        : value.match(/^([-][ ]*)?[\d]+([.][\d]*)?$/) // regex for numeric only, with optional negative sign and optional decimal places
        ? parseFloat(value)
        : e.target.value,
    );
  };

  const [debouncedEventUpdate, _setDebounceEvent] = React.useState(() =>
    debounce(eventUpdate, props.updateDebounce || DEFAULT_DEBOUNCE_DELAY),
  );

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
      <input type="string" id={name} name={name} defaultValue={value} onChange={onChange} onBlur={onBlur}></input>
    </>
  );
};
export default NumberInput;
