export type TempTestProps = {
  label?: string;
};

export const TempTest = ({ label = 'TempTest' }: TempTestProps) => (
  <div
    style={{
      display: 'inline-block',
      padding: '8px 12px',
      borderRadius: 8,
      background: '#eef2ff',
      color: '#1e40af',
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans',
      fontSize: 14,
      border: '1px solid #c7d2fe',
    }}
  >
    {label}
  </div>
);
