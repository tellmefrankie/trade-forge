import '@tanstack/react-table';

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    label?: string;
    placeholder?: string;
    variant?:
      | 'text'
      | 'number'
      | 'range'
      | 'select'
      | 'multiSelect'
      | 'date'
      | 'dateRange';
    options?: Option[];
    range?: [number, number];
    unit?: string;
  }
}
