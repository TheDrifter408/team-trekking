import { Header } from '@tanstack/react-table';

type ColumnResizerProps<TData> = {
  header: Header<TData, unknown>;
};

export const ColumnResizer = <TData,>({
  header,
}: ColumnResizerProps<TData>) => {
  if (!header.column.getCanResize()) return null;

  return (
    <div
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className="absolute top-1/2 right-0 cursor-col-resize bg-muted hover:bg-muted-foreground transition-colors -translate-y-1/2"
      style={{
        userSelect: 'none',
        touchAction: 'none',
      }}
    />
  );
};
