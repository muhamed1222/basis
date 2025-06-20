import React, { useState } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { generateProfile, GenerateProfileParams } from '../services/ai';
import { Loader } from '../components/Loader';

import { useCallback } from 'react';
import { Button } from '../ui/Button';
import Spinner from '../ui/Spinner';
import type { GeneratedProfile } from '../services/ai';

type GenerateInput = {
  goals: string;
  description: string;
};

const initialInput: GenerateInput = { goals: '', description: '' };

type HistoryItem = {
  input: GenerateInput;
  result: GeneratedProfile;
};

const AiDemoPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GeneratedProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<GenerateInput>(initialInput);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = useCallback(async () => {
    if (!input.goals.trim() || !input.description.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await generateProfile(input as GenerateProfileParams);
      setData(result);
      setHistory((prev) => [{ input, result }, ...prev]);
      setInput(initialInput);
    } catch (e: any) {
      setError('Ошибка генерации. Проверьте данные и попробуйте ещё раз.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [input]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <StandardPageLayout title="AI Помощник">
      <div className="space-y-5 max-w-xl mx-auto py-8">
        <div className="bg-white border rounded-xl p-5 shadow space-y-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="goals">
              Цели{' '}
              <span className="text-gray-400 ml-2 text-xs">
                (например, «Хочу выучить Python за месяц»)
              </span>
            </label>
            <input
              id="goals"
              name="goals"
              className="w-full border p-2 rounded focus:ring"
              placeholder="Опиши свои цели"
              value={input.goals}
              onChange={handleChange}
              maxLength={120}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="description">
              Описание задачи{' '}
              <span className="text-gray-400 ml-2 text-xs">
                (например, «Уровень знаний — нулевой. Учусь вечерами»)
              </span>
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full border p-2 rounded focus:ring min-h-[64px]"
              placeholder="Добавь детали, которые помогут AI"
              value={input.description}
              onChange={handleChange}
              maxLength={400}
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading || !input.goals.trim() || !input.description.trim()}
            aria-busy={loading}
            className="w-full flex items-center justify-center"
          >
            {loading && <Spinner size="h-4 w-4" className="mr-2" />}
            {loading ? 'AI генерирует…' : 'Сгенерировать'}
          </Button>
          {error && (
            <div className="flex items-center gap-2 text-red-600 mt-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M18 10A8 8 0 11..." clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>

        {data && (
          <div className="mt-4 p-4 border rounded-xl bg-gray-50 shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Результат</h3>
              <button
                onClick={() => handleCopy(JSON.stringify(data, null, 2))}
                className="text-xs text-blue-600 hover:underline"
                title="Скопировать результат"
              >
                Копировать
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">История генераций</h4>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {history.map((h, i) => (
                <div key={i} className="border rounded p-2 bg-white">
                  <div className="text-xs text-gray-400 mb-1">
                    <span>Цели:</span> {h.input.goals}{' '}
                    <span className="mx-2">|</span>{' '}
                    <span>Описание:</span> {h.input.description}
                  </div>
                  <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded">
                    {JSON.stringify(h.result, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StandardPageLayout>
  );
};

export default AiDemoPage;