import React, { useEffect, useState } from 'react';
import slugify from 'slugify';
import { checkSlugUnique } from '../services/slugService';

interface Props {
  base?: string;
}

export const SlugEditor: React.FC<Props> = ({ base = 'https://example.com/' }) => {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'ok' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const s = slugify(input, { lower: true, strict: true });
    setSlug(s);
  }, [input]);

  useEffect(() => {
    if (!slug) return;
    setStatus('checking');
    checkSlugUnique(slug)
      .then((r) => setStatus(r.unique ? 'ok' : 'error'))
      .catch(() => setStatus('error'));
  }, [slug]);

  const copy = () => {
    navigator.clipboard.writeText(base + slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={input}
        placeholder="Ваш URL"
        className="border px-2 py-1 rounded w-full"
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm">{base + slug}</span>
        <button className="px-2 py-1 text-sm bg-gray-200 rounded" onClick={copy}>
          Копировать
        </button>
        {status === 'checking' && <span className="text-gray-500 text-sm">...</span>}
        {status === 'ok' && <span className="text-green-600 text-sm">Свободен</span>}
        {status === 'error' && <span className="text-red-600 text-sm">Занят</span>}
        {copied && <span className="text-blue-600 text-sm">Скопировано</span>}
      </div>
    </div>
  );
};
