import * as React from 'react';

import styled from 'styled-components';

import { getComponentForField } from '../display/inputs';
import FieldValidation from '../display/FieldValidation';
import { LecternField, LecternFieldValue, ValidationResponse, LecternSchema } from 'lectern';
import { useDictionarySubmissionContext } from '../context';

const InputWrapper = styled.div`
  margin: 5px;
`;

const FieldInput = (props: { schema: LecternSchema; field: LecternField }) => {
  const context = useDictionarySubmissionContext();
  const validation = context.userInputs[props.schema.name][props.field.name]?.validation;
  const InputComponent = getComponentForField(props.field);

  return (
    <InputWrapper>
      <InputComponent
        field={props.field}
        value={context.userInputs[props.schema.name][props.field.name]?.value}
        clearValidation={() => context.clearUserInputValidation(props.schema.name, props.field.name)}
        onUpdate={(value: LecternFieldValue) =>
          context.updateUserInput(props.schema.name, props.field.name, value, context.userInputs[props.schema.name])
        }
      ></InputComponent>
      <FieldValidation validation={validation} />
    </InputWrapper>
  );
};

export default FieldInput;
