import * as React from 'react';

const SubmittedRecordsEmptyData = (props: { columns: number }) => {
  console.log(`empty`);
  return (
    <tr>
      <td colSpan={props.columns} style={{ border: '1px solid', textAlign: 'center' }}>
        No Data Submitted
      </td>
    </tr>
  );
};

export default SubmittedRecordsEmptyData;
