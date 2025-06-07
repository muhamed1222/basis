import React, { useState } from 'react';
import { checkSlugUnique, publishProfile } from '../services/profile';
import { useToast } from './ToastProvider';

interface Props {
  slug: string;
  data: unknown;
}

export const PublishProfileButton: React.FC<Props> = ({ slug, data }) => {
  const { showError, showSuccess } = useToast();
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<'private' | 'public'>('private');

  const confirmPublish = async () => {
    if (!window.confirm('Опубликовать профиль?')) return;
    setPublishing(true);
    try {
      const unique = await checkSlugUnique(slug);
      if (!unique) throw new Error('Слаг занят');
      await publishProfile(slug, { ...data, status });
      showSuccess('Профиль опубликован');
    } catch (e) {
      showError((e as Error).message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-x-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'private' | 'public')}
        className="border p-1 rounded"
      >
        <option value="public">Публичный</option>
        <option value="private">Приватный</option>
      </select>
      <button
        onClick={confirmPublish}
        disabled={publishing}
        className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        Опубликовать профиль
      </button>
    </div>
  );
};
