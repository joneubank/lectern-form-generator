import * as React from 'react';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';

import { SchemaInputs } from 'form-components';
import { LecternSchema } from 'lectern';

import config from './config';

import dictionary from '../../../resources/dictionaries/simple-dictionary.json';

// const getDictionary = async () => ();

// const StyledForm = styled.form`
//   input {
//   }
// `;

const App = () => {
  return (
    <>
      <Helmet>
        <title>{config.site.title}</title>
        <meta name="description" content={config.site.description} />
      </Helmet>
      <pre>
        <code>{JSON.stringify(dictionary, null, 2)}</code>
      </pre>
      <form>
        {dictionary ? <SchemaInputs schema={dictionary.schemas[0] as LecternSchema} /> : 'Loading dictionary...'}
      </form>
    </>
  );
};
export default App;
