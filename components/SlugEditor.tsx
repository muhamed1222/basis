import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  valid: boolean | null;
  base?: string;
}

export const SlugEditor: React.FC<Props> = ({ value, onChange, valid, base = 'https://example.com/' }) => {
  const copy = () => {
    navigator.clipboard.writeText(base + value);
  };

  return (
    <div className="space-y-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-2 py-1 rounded w-full"
        placeholder="Адрес"
      />
      <div className="flex items-center gap-2 text-sm">
        <span>{base + value}</span>
        <button className="px-2 py-1 bg-gray-200 rounded" onClick={copy}>
          Копировать
        </button>
        {valid === null ? null : valid ? (
          <span className="text-green-600">Свободен</span>
        ) : (
          <span className="text-red-600">Занят</span>
        )}
      </div>
    </div>
  );
};
