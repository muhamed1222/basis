import React from 'react';

export interface Template {
  id: string;
  title: string;
  image: string;
}

const templates: Template[] = [
  { id: 't1', title: 'Классический', image: 'https://placehold.co/150?text=1' },
  { id: 't2', title: 'Минимализм', image: 'https://placehold.co/150?text=2' },
  { id: 't3', title: 'Темный', image: 'https://placehold.co/150?text=3' },
];

export const TemplateGallery: React.FC<{
  onSelect: (id: string) => void;
}> = ({ onSelect }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Выберите шаблон</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.id)}
            className="border rounded p-2 hover:shadow"
          >
            <img src={tpl.image} alt={tpl.title} className="w-full mb-2" />
            <span>{tpl.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
