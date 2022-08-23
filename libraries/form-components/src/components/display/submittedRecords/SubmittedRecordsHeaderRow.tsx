import * as React from 'react';

import { Header } from '@tanstack/react-table';

const SubmittedRecordsHeaderRow = (props: { headers: Header<any, any>[] }) => {
  return (
    <thead>
      <tr>
        {props.headers.map((header) => {
          const label = header.column.id;
          return (
            <th
              data-accessor={header.id}
              data-header={label}
              key={header.id}
              title={label}
              style={{ border: '1px solid' }}
            >
              {header.id}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default SubmittedRecordsHeaderRow;
