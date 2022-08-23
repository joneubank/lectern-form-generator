import { LecternField, LecternFieldValue, LecternSchema } from 'lectern';
import * as React from 'react';

import { useReactTable, ColumnDef, getCoreRowModel } from '@tanstack/react-table';

import SubmittedRecordsHeaderRow from './SubmittedRecordsHeaderRow';
import SubmittedRecordsDataRow from './SubmittedRecordsDataRow';
import SubmittedRecordsEmptyData from './SubmittedRecordsEmptyData';
import { SchemaRecord } from '../../../types';

function fieldToColumnDef(field: LecternField): ColumnDef<any> {
  return { id: field.name };
}

const SubmittedRecordsTable = (props: { schema: LecternSchema; records: SchemaRecord[] }) => {
  const columns = props.schema.fields.map(fieldToColumnDef);

  const table = useReactTable({ columns, data: props.records, getCoreRowModel: getCoreRowModel() });
  const rows = table.getRowModel().rows;

  return (
    <table style={{ border: '1px solid', borderSpacing: 0 }}>
      <SubmittedRecordsHeaderRow headers={table.getFlatHeaders()}></SubmittedRecordsHeaderRow>
      <tbody>
        {rows.length > 0 ? (
          rows.map((rowData, rowIndex) => (
            <SubmittedRecordsDataRow key={rowIndex} row={rowData} record={props.records[rowData.index]} />
          ))
        ) : (
          <SubmittedRecordsEmptyData columns={columns.length} />
        )}
      </tbody>
    </table>
  );
};

export default SubmittedRecordsTable;
