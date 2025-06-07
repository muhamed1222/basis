import React from 'react';

const layouts = [
  { id: 'feed', label: 'Лента' },
  { id: 'grid', label: 'Сетка' },
  { id: 'cards', label: 'Карточки' },
  { id: 'tabs', label: 'Табы' },
];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const ProfileLayoutSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {layouts.map((l) => (
        <button
          key={l.id}
          onClick={() => onChange(l.id)}
          className={`px-3 py-1 rounded border ${value === l.id ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};
