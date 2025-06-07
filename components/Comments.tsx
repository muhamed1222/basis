import React, { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export const Comments: React.FC = () => {
  const { data, comment, removeComment } = useAnalytics();
  const [text, setText] = useState('');

  const submit = () => {
    if (text.trim()) {
      comment(text.trim().slice(0, 140));
      setText('');
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={140}
          placeholder="Добавить комментарий"
          className="border p-1 mr-2 rounded"
        />
        <button onClick={submit} className="px-2 py-1 bg-indigo-500 text-white rounded">
          Отправить
        </button>
      </div>
      <ul className="space-y-1 text-sm">
        {data.comments.map((c) => (
          <li key={c.id} className="flex justify-between bg-gray-100 p-1 rounded">
            <span>{c.text}</span>
            <button onClick={() => removeComment(c.id)} className="text-red-600 ml-2">
              удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
