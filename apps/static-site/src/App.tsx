import * as React from 'react';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';

import { DictionaryLayout, DictionarySubmissionProvider } from 'form-components';
import { LecternDictionary } from 'lectern';

import config from './config';

import allInputsDictionary from '../../../resources/dictionaries/all-inputs.json';

const dictionary = allInputsDictionary;

const App = () => {
  return (
    <>
      <Helmet>
        <title>{config.site.title}</title>
        <meta name="description" content={config.site.description} />
      </Helmet>

      <DictionarySubmissionProvider dictionary={dictionary as LecternDictionary}>
        <DictionaryLayout dictionary={dictionary as LecternDictionary} />
      </DictionarySubmissionProvider>
    </>
  );
};
export default App;
