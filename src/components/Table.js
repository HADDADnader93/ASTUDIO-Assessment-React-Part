import React from 'react';

const Table = ({ data, columns }) => {
  // Check if data is an array and has elements
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.accessor}>
                {row[column.accessor] !== undefined && row[column.accessor] !== null
                  ? row[column.accessor]
                  : 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
