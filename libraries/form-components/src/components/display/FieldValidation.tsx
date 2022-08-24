import { ValidationResponse } from 'lectern';
import * as React from 'react';
import styled from 'styled-components';

const ErrorSpan = styled.span`
  color: red;
`;

const FieldValidation = (props: { validation: ValidationResponse | undefined }) => {
  const errorMessages = props.validation?.failures?.map((failure) => failure.message).join(', ');
  return (
    <>
      {props.validation?.valid && '✓'}
      {props.validation?.valid === false && '✗'} <ErrorSpan>{errorMessages}</ErrorSpan>
    </>
  );
};

export default FieldValidation;
