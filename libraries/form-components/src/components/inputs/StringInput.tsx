import { LecternFieldValue } from 'lectern';
import * as React from 'react';
import { useState } from 'react';

import { LecternField } from 'lectern';
import FieldInputComponent from './FieldInputComponent';

const StringInput: FieldInputComponent = (props: {
  value?: string;

  field: LecternField;
  onUpdate: (value: LecternFieldValue) => void;
  updateDebounce?: number;
}) => {
  const name = props.field.name;

  const timeout = setTimeout(() => {}, 100);
  const [updateTimeout, setUpdateTimeout] = React.useState<number | undefined>();

  function debouncedUpdate(newValue: LecternFieldValue): void {
    if (updateTimeout) {
      clearInterval(updateTimeout);
    }
    const interval = setTimeout(() => {}, props.updateDebounce || 1000); // default 1 second
    setUpdateTimeout(interval);
  }

  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input type="text" id={name} name={name} value={props.value}></input>
    </>
  );
};
export default StringInput;
