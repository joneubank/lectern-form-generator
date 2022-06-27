import * as React from 'react';
import styled from 'styled-components';

const ErrorSpan = styled.span`
  color: red;
`;

const FieldError = (props: { message: string }) => {
  return <ErrorSpan>{props.message}</ErrorSpan>;
};

export default FieldError;
