import React, { useState } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { AvatarUploader } from '../components/AvatarUploader';
import { CoverUploader } from '../components/CoverUploader';
import { SlugEditor } from '../components/SlugEditor';
import { ProfileLayoutSelector } from '../components/ProfileLayoutSelector';
import { RichTextEditor } from '../components/RichTextEditor';
import { Button } from '../ui/Button';
import { useSlugValidation } from '../hooks/useSlugValidation';

const RESERVED_SLUGS = ['admin', 'test', 'profile'];

const PersonalizationPage: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [slug, setSlug] = useState('');
  const slugValid = useSlugValidation(slug, RESERVED_SLUGS);
  const [layout, setLayout] = useState<'feed' | 'grid' | 'cards'>('feed');
  const [blocks, setBlocks] = useState<string[]>([
    'Кнопка 1',
    'Кнопка 2',
    'Кнопка 3',
  ]);


  const copySlug = () => {
    const url = `${window.location.origin}/u/${slug}`;
    navigator.clipboard.writeText(url);
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
          <AvatarUploader onChange={setAvatarPreview} />
          <CoverUploader onChange={setCoverPreview} />
          <SlugEditor
            value={slug}
            onChange={setSlug}
            valid={slugValid}
            base="https://basis.app/"
          />
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
          <ProfileLayoutSelector value={layout} onChange={setLayout} />
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
