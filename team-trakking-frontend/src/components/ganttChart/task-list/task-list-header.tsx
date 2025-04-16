import React from 'react';

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
}> = ({ headerHeight, fontFamily, fontSize, rowWidth }) => {
  return (
    <div
      className="table border-y border-l border-muted"
      style={{
        fontFamily,
        fontSize,
      }}
    >
      <div className="table-row bg-white text-black">
        <div
          className="table-cell align-middle px-2"
          style={{
            minWidth: rowWidth,
            height: headerHeight - 2,
          }}
        >
          &nbsp;Name
        </div>
        <div
          className="border-r border-gray-300"
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        />
        <div
          className="table-cell align-middle px-2"
          style={{
            minWidth: rowWidth,
            height: headerHeight - 2,
          }}
        >
          &nbsp;From
        </div>
        <div
          className="border-r border-gray-300"
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className="table-cell align-middle px-2"
          style={{
            minWidth: rowWidth,
            height: headerHeight - 2,
          }}
        >
          &nbsp;To
        </div>
      </div>
    </div>
  );
};
