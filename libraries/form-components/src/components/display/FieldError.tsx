import * as React from 'react';
import styled from 'styled-components';

const ErrorSpan = styled.span`
  color: red;
`;

const FieldError = (props: { message: string; valid?: boolean }) => {
  return (
    <>
      {props.valid && '✓'}
      {props.valid === false && '✗'} <ErrorSpan>{props.message}</ErrorSpan>
    </>
  );
};

export default FieldError;
