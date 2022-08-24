import * as React from 'react';

import styled from 'styled-components';

import { getComponentForField } from '../display/inputs';
import FieldValidation from '../display/FieldValidation';
import { LecternField, LecternFieldValue, ValidationResponse, LecternSchema } from 'lectern';
import { useDictionarySubmissionContext } from '../context';
import { FieldInputState } from '../../types';

const InputWrapper = styled.div`
  margin: 5px;
`;

const FieldInput = (props: {
  field: LecternField;
  state: FieldInputState;
  onUpdate: (state: FieldInputState) => void;
}) => {
  const InputComponent = getComponentForField(props.field);

  return (
    <InputWrapper>
      <InputComponent field={props.field} state={props.state} onUpdate={props.onUpdate}></InputComponent>
    </InputWrapper>
  );
};

export default FieldInput;
