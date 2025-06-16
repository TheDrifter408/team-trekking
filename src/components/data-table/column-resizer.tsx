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
      className="absolute top-[23px] rounded-lg right-0 cursor-col-resize w-[4px] h-[28px] bg-transparent hover:bg-theme-main transition-colors -translate-y-1/2"
      style={{
        userSelect: 'none',
        touchAction: 'none',
      }}
    />
  );
};
