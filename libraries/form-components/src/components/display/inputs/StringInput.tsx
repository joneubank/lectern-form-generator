import * as React from 'react';

import { LecternField, LecternFieldValue, validateField, ValidationResponse } from 'lectern';

import FieldInputComponent from './FieldInputComponent';
import debounce from '../../../utils/debounce';
import { DEFAULT_DEBOUNCE_DELAY } from '.';
import { FieldInputState, SchemaInputState } from '../../../types';
import FieldValidation from '../FieldValidation';
import { convertInputStateToSchemaRecord } from '../../../utils/schemaFormUtils';

const StringInput: FieldInputComponent = (props: {
  field: LecternField;
  state: FieldInputState;
  onUpdate: (state: LecternFieldValue) => void;
  updateDebounce?: number;
  clearValidation: () => void;
}) => {
  const eventUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdate(e.target.value);
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

  const name = props.field.name;
  const value = props.state.value === undefined ? '' : `${props.state.value}`;

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input type="text" id={name} name={name} defaultValue={value} onChange={onChange} onBlur={onBlur} />
      <FieldValidation validation={props.state.validation} />
    </>
  );
};
export default StringInput;
