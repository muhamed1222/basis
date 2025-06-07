import React, { useState, useEffect } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Button } from '../ui/Button';
import { RichTextEditor } from '../components/RichTextEditor';

const takenSlugs = ['admin', 'test', 'profile'];

const checkSlugAvailability = async (slug: string) => {
  await new Promise((res) => setTimeout(res, 300));
  return !takenSlugs.includes(slug.toLowerCase());
};

const PersonalizationPage: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [slug, setSlug] = useState('');
  const [slugValid, setSlugValid] = useState<boolean | null>(null);
  const [layout, setLayout] = useState<'feed' | 'grid' | 'cards'>('feed');
  const layoutOptions = ['feed', 'grid', 'cards'] as const;
  const [blocks, setBlocks] = useState<string[]>([
    'Кнопка 1',
    'Кнопка 2',
    'Кнопка 3',
  ]);

  useEffect(() => {
    if (!slug) {
      setSlugValid(null);
      return;
    }
    const id = setTimeout(() => {
      checkSlugAvailability(slug).then(setSlugValid);
    }, 400);
    return () => clearTimeout(id);
  }, [slug]);

  const copySlug = () => {
    const url = `${window.location.origin}/u/${slug}`;
    navigator.clipboard.writeText(url);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const updateBlock = (index: number, val: string) => {
    setBlocks((b) => {
      const copy = [...b];
      copy[index] = val;
      return copy;
    });
  };

  const previewLayout = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-2 gap-4';
      case 'cards':
        return 'flex space-x-4';
      default:
        return 'space-y-2 flex flex-col';
    }
  };

  return (
    <StandardPageLayout title="Редактор персонализации">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-1/3 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Аватар</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="avatar"
                className="mt-2 w-24 h-24 object-cover rounded-full"
              />
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Обложка</label>
            <input type="file" accept="image/*" onChange={handleCoverChange} />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover"
                className="mt-2 w-full h-24 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Адрес профиля</label>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 p-2 border rounded"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              {slug && slugValid !== null && (
                <span className={slugValid ? 'text-green-600' : 'text-red-600'}>
                  {slugValid ? 'Свободен' : 'Занят'}
                </span>
              )}
              <Button onClick={copySlug} className="px-2 py-1">
                Копировать
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {blocks.map((val, i) => (
              <div key={i}>
                <p className="font-medium mb-1">Текст блока {i + 1}</p>
                <RichTextEditor
                  value={val}
                  onChange={(v) => updateBlock(i, v)}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block mb-1 font-medium">Структура профиля</label>
            <div className="flex items-center gap-2">
              {layoutOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-1">
                  <input
                    type="radio"
                    value={opt}
                    checked={layout === opt}
                    onChange={() => setLayout(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <div className="border rounded overflow-hidden">
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover"
                className="w-full h-32 object-cover"
              />
            )}
            <div className="p-4">
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-24 h-24 rounded-full -mt-12 border-4 border-white"
                />
              )}
              <div className={`mt-4 ${previewLayout()}`}>
                {blocks.map((val, i) => (
                  <a
                    key={i}
                    href="#"
                    className="px-4 py-2 bg-blue-500 text-white rounded inline-block"
                    dangerouslySetInnerHTML={{ __html: val }}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </StandardPageLayout>
  );
};

export default PersonalizationPage;
