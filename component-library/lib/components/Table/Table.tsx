import React from "react";
import {DynamicTableProps} from "../../types";



export const Table: React.FC<DynamicTableProps> = ({ columns, data }) => {
  return (
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
                <th
                    key={col.key}
                    className={`px-4 py-3 text-left font-semibold text-gray-700 ${
                        col.sticky ? "sticky left-0 bg-gray-100 z-10" : ""
                    }`}
                >
                  {col.header}
                </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data.map((row, rowIndex) => (
              <tr
                  key={rowIndex}
                  className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
              >
                {columns.map((col) => (
                    <td
                        key={col.key}
                        className={`px-4 py-2 border-b text-gray-600 ${
                            col.sticky ? "sticky left-0 bg-white z-10" : ""
                        }`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};
