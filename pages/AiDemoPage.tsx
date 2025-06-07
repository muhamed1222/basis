import React, { useState } from 'react';
import { StandardPageLayout } from '../App';
import { useGenerateProfile } from '../hooks/useGenerateProfile';
import { Button } from '../ui/Button';

const AiDemoPage: React.FC = () => {
  const { loading, data, error, run } = useGenerateProfile();
  const [goals, setGoals] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerate = () => {
    run({ goals, description });
  };

  return (
    <StandardPageLayout title="AI Помощник">
      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-semibold">Цели</label>
          <input
            className="w-full border p-2 rounded"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Описание</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? 'AI генерирует...' : 'Сгенерировать'}
        </Button>
        {error && <p className="text-red-600">Произошла ошибка</p>}
        {data && (
          <div className="mt-4 p-3 border rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Результат</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </StandardPageLayout>
  );
};

export default AiDemoPage;
