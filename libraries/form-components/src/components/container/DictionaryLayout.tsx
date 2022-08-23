import { LecternDictionary, LecternSchema } from 'lectern';
import * as React from 'react';
import { useState } from 'react';
import SchemaLayout from './SchemaLayout';

const DictionaryLayout = (props: { dictionary: LecternDictionary }) => {
  return (
    <>
      {props.dictionary.schemas.map((schema, index) => (
        <SchemaLayout key={index} schema={schema}></SchemaLayout>
      ))}
    </>
  );
};

export default DictionaryLayout;
