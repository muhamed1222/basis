import React, { useState } from 'react';

export const LiveEditor: React.FC = () => {
  const [title, setTitle] = useState('Заголовок профиля');
  const [color, setColor] = useState('#000000');

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="w-full md:w-1/3 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Текст заголовка</label>
          <input
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Цвет текста</label>
          <input
            type="color"
            className="w-full h-10 p-1 border rounded"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100 rounded">
        <div className="text-center">
          <h1 style={{ color }} className="text-3xl font-bold mb-2">
            {title}
          </h1>
          <p className="text-gray-500">Это демо-контент вашего профиля</p>
        </div>
      </div>
    </div>
  );
};
