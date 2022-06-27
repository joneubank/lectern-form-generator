import * as React from 'react';
import styled from 'styled-components';

import { LecternField } from 'lectern';

import getComponentForField from '../getComponentForField';
import FieldError from './FieldError';
import { LecternFieldValue } from 'lectern';

const InputWrapper = styled.div`
  margin: 5px;
`;

const FieldInput = (props: { field: LecternField }) => {
  const InputComponent = getComponentForField(props.field);

  return (
    <InputWrapper>
      <InputComponent
        field={props.field}
        onUpdate={(value: LecternFieldValue) => alert(`new value: ${value}`)}
      ></InputComponent>
      <FieldError message={props.field.description} />
    </InputWrapper>
  );
};

export default FieldInput;
