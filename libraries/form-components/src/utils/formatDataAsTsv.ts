import { LecternFieldValue, LecternSchema } from 'lectern';

import { SchemaRecord } from '../types';

function formatDataAsTsv(schema: LecternSchema, data: SchemaRecord[]): string {
  const headerLine: string = schema.fields.map((field) => field.name).join('\t');
  const dataLines: string[] = data.map((record) => {
    const orderedFields: (string | number | boolean)[] = [];
    schema.fields.forEach((field) => {
      const fieldValue: LecternFieldValue = record[field.name];
      orderedFields.push(fieldValue === undefined ? '' : fieldValue);
    });

    return orderedFields.join('\t');
  });
  return [headerLine, ...dataLines].join('\n');
}

export default formatDataAsTsv;
