import * as React from 'react';
import { Row } from '@tanstack/react-table';

import { SchemaRecord } from '../../../types';
import { LecternFieldValue } from 'lectern';

function getDisplayValue(value: LecternFieldValue): string | number {
  if (value === undefined) {
    return '';
  }
  if (value === true) {
    return 'true';
  }
  if (value === false) {
    return 'false';
  }
  return value;
}

const SubmittedRecordsDataRow = (props: { row: Row<any>; record: SchemaRecord }) => {
  return (
    <tr>
      {props.row.getAllCells().map((cell, cellIndex) => (
        <td key={cellIndex} style={{ border: '1px solid' }}>
          {getDisplayValue(props.record[cell.column.id])}
        </td>
      ))}
    </tr>
  );
};

export default SubmittedRecordsDataRow;
