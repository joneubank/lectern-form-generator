import * as React from 'react';
import getComponentForField from '../getComponentForField';
import { LecternField } from '../types/lectern';

const SchemaFieldInput = (props: { field: LecternField }) => {
  const InputComponent = getComponentForField(props.field);
  return <InputComponent field={props.field}></InputComponent>;
};

export default SchemaFieldInput;
