import { LecternDictionary } from 'lectern';
import * as React from 'react';
import styled from 'styled-components';

const ErrorSpan = styled.span`
  color: red;
`;

const DictionaryExplorer = (props: { dictionary: LecternDictionary }) => {
  return <pre id="json">{JSON.stringify(props.dictionary, null, 2)}</pre>;
};

export default DictionaryExplorer;
