import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
  sticky?: boolean;
  align?: "left" | "center" | "right"; // Text alignment option
  sortable?: boolean; // Enable column sorting
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyStateMessage?: string; // Custom message when no data
  loading?: boolean; // Loading state
  onRowClick?: (row: T) => void; // Row click handler
  stickyHeader?: boolean; // Make header sticky on vertical scroll
  zebra?: boolean; // Enable zebra striping
  height?: string; // Fixed height with scrollable body
}

// Using a type for theme consistency
const theme = {
  colors: {
    background: "#ffffff",
    headerBackground: "#f9fafc",
    hoverBackground: "#f5f7fa",
    border: "#ebedf2",
    text: "#292d34",
    headerText: "#7f8595",
    shadow: "rgba(0, 0, 0, 0.06)",
  },
  spacing: {
    cell: "12px",
    borderRadius: "12px",
  },
};

const TableContainer = styled.div<{ height?: string }>`
  width: 100%;
  overflow: hidden; /* Hide overflows */
  background-color: ${theme.colors.background};
  border-radius: ${theme.spacing.borderRadius};
  box-shadow: 0 2px 8px ${theme.colors.shadow};
  border: 1px solid ${theme.colors.border};
  height: ${(props) => props.height || "auto"};
  display: flex;
  flex-direction: column;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  flex: 1;
  /* Improved scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

const Table = styled.div`
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHeader = styled.div<{ sticky?: boolean }>`
  display: table-header-group;
  background-color: ${theme.colors.headerBackground};
  ${(props) =>
    props.sticky &&
    `
    position: sticky;
    top: 0;
    z-index: 3;
  `}
`;

interface HeaderCellProps {
  width?: string;
  sticky?: boolean;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sorted?: boolean;
  sortDirection?: "asc" | "desc";
}

const HeaderCell = styled.div<HeaderCellProps>`
  display: table-cell;
  padding: ${theme.spacing.cell};
  font-size: 14px;
  font-weight: 600;
  text-align: ${(props) => props.align || "left"};
  color: ${theme.colors.headerText};
  min-width: ${(props) => props.width || "150px"};
  white-space: nowrap;

  ${(props) =>
    props.sticky &&
    `
    position: sticky;
    left: 0;
    background-color: ${theme.colors.headerBackground};
    z-index: ${props.sorted ? "4" : "2"};
    border-right: 1px solid ${theme.colors.border};
  `}

  ${(props) =>
    props.sortable &&
    `
    cursor: pointer;
    user-select: none;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  `}
`;

const SortIcon = styled.span<{ direction?: "asc" | "desc" }>`
  display: inline-block;
  margin-left: 6px;
  &::after {
    content: "${(props) =>
      props.direction === "asc"
        ? "↑"
        : props.direction === "desc"
          ? "↓"
          : "⇅"}";
    opacity: ${(props) => (props.direction ? "1" : "0.5")};
  }
`;

const TableBody = styled.div`
  display: table-row-group;
`;

interface TableRowProps {
  isEven: boolean;
  zebra?: boolean;
  clickable?: boolean;
}

const TableRow = styled.div<TableRowProps>`
  display: table-row;
  border-bottom: 1px solid ${theme.colors.border};
  background-color: ${(props) =>
    props.zebra && props.isEven ? "#fcfcfd" : "transparent"};

  ${(props) =>
    props.clickable &&
    `
    cursor: pointer;
  `}

  &:hover {
    background-color: ${theme.colors.hoverBackground};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div<{
  sticky?: boolean;
  align?: "left" | "center" | "right";
  isEven?: boolean;
  zebra?: boolean;
}>`
  display: table-cell;
  padding: ${theme.spacing.cell};
  font-size: 14px;
  color: ${theme.colors.text};
  text-align: ${(props) => props.align || "left"};
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${(props) =>
    props.sticky &&
    `
    position: sticky;
    left: 0;
    z-index: 1;
    border-right: 1px solid ${theme.colors.border};
    
    /* Ensure sticky cell has proper background for all states */
    background-color: ${props.zebra && props.isEven ? "#fcfcfd" : theme.colors.background};
    
    /* This ensures parent hover states are properly applied to sticky cells */
    ${TableRow}:hover & {
      background-color: ${theme.colors.hoverBackground};
    }
  `}
`;

const LoadingOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 10;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: ${theme.colors.headerText};
  font-size: 14px;
`;

export const DynamicTable2 = <T,>({
  columns,
  data,
  emptyStateMessage = "No data available",
  loading = false,
  onRowClick,
  stickyHeader = false,
  zebra = false,
  height,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [sortedData, setSortedData] = useState<T[]>(data);
  const tableRef = useRef<HTMLDivElement>(null);

  // Handle sorting
  useEffect(() => {
    if (!sortConfig) {
      setSortedData(data);
      return;
    }

    const sortedItems = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === "asc"
        ? (aValue as any) - (bValue as any)
        : (bValue as any) - (aValue as any);
    });

    setSortedData(sortedItems);
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    setSortConfig((prevConfig) => {
      if (!prevConfig || prevConfig.key !== key) {
        return { key, direction: "asc" };
      }

      if (prevConfig.direction === "asc") {
        return { key, direction: "desc" };
      }

      return null; // Reset sorting
    });
  };

  return (
    <TableContainer height={height} ref={tableRef}>
      <TableWrapper>
        <Table>
          <TableHeader sticky={stickyHeader}>
            <TableRow isEven={false}>
              {columns.map((column, index) => (
                <HeaderCell
                  key={column.key as string}
                  width={column.width}
                  sticky={column.sticky}
                  align={column.align}
                  sortable={column.sortable}
                  sorted={sortConfig?.key === column.key}
                  sortDirection={
                    sortConfig?.key === column.key
                      ? sortConfig.direction
                      : undefined
                  }
                  onClick={() => column.sortable && requestSort(column.key)}
                >
                  {column.header}
                  {column.sortable && (
                    <SortIcon
                      direction={
                        sortConfig?.key === column.key
                          ? sortConfig.direction
                          : undefined
                      }
                    />
                  )}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  isEven={rowIndex % 2 === 0}
                  zebra={zebra}
                  clickable={!!onRowClick}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key as string}
                      sticky={column.sticky}
                      align={column.align}
                    >
                      {column.render
                        ? column.render(row)
                        : (row[column.key] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow isEven={false}>
                <TableCell
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    columnSpan: columns.length.toString(),
                  }}
                >
                  {emptyStateMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableWrapper>

      {loading && (
        <LoadingOverlay>
          <div>Loading...</div>
        </LoadingOverlay>
      )}

      {!loading && data.length === 0 && (
        <EmptyState>{emptyStateMessage}</EmptyState>
      )}
    </TableContainer>
  );
};
