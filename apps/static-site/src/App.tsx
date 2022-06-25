import * as React from 'react';
import { Helmet } from 'react-helmet';

import dictionary from '../../../resources/dictionaries/simple-dictionary.json';

import { SchemaInputs } from 'form-components';

import config from './config';
import { LecternSchema } from 'form-components/dist/types/lectern';

// const dictionary =

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
      <SchemaInputs schema={dictionary.schemas[0] as LecternSchema} />
    </>
  );
};
export default App;
