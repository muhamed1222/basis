import React, { useEffect, useState } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { AvatarUploader } from '../components/AvatarUploader';
import { CoverUploader } from '../components/CoverUploader';
import { SlugEditor } from '../components/SlugEditor';
import { ButtonLinkEditor } from '../components/ButtonLinkEditor';
import { RichTextEditor } from '../components/RichTextEditor';
import { ProfileLayoutSelector } from '../components/ProfileLayoutSelector';
import { Toast } from '../components/Toast';
import { fetchProfile, saveProfile, ProfileData } from '../services/profileService';
import { Button } from '../ui/Button';
import Spinner from '../ui/Spinner';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const BLOCK_TYPES = [
  { type: 'button', label: 'Кнопка', default: { text: 'Ссылка', url: '#', style: 'primary' } },
  { type: 'text', label: 'Текст', default: { text: 'Новый текст' } },
  { type: 'divider', label: 'Разделитель', default: {} },
];


const ProfileCustomizationPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    avatar: null,
    cover: null,
    slug: '',
    layout: 'feed',
    color: '#2f80ed',
    blocks: [],
  });
  const slugValid = useSlugValidation(profile.slug, RESERVED_SLUGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);


  const addBlock = (type: string) => {
    const blockType = BLOCK_TYPES.find((b) => b.type === type);
    if (!blockType) return;
    setProfile((p) => ({ ...p, blocks: [...p.blocks, { type, ...blockType.default }] }));
  };

  const removeBlock = (index: number) => {
    setProfile((p) => ({ ...p, blocks: p.blocks.filter((_, i) => i !== index) }));
  };

    setProfile((p) => ({
      ...p,
      blocks: p.blocks.map((b, i) => (i === index ? { ...b, ...props } : b)),
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newBlocks = Array.from(profile.blocks);
    const [removed] = newBlocks.splice(result.source.index, 1);
    newBlocks.splice(result.destination.index, 0, removed);
    setProfile((p) => ({ ...p, blocks: newBlocks }));
  };

  const handleSave = async () => {
    if (!slugValid) {
      setToast('Некорректный адрес профиля');
      return;
    }
    setSaving(true);
    try {
      await saveProfile(profile);
      await registerSlug(profile.slug);
      setToast('Профиль сохранён!');
    } catch {
      setToast('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <StandardPageLayout title="Персонализация профиля">
        <div className="py-16 text-center text-gray-500 text-lg">Загрузка…</div>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title="Персонализация профиля">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/3 space-y-5">
          <AvatarUploader onChange={(avatar) => setProfile((p) => ({ ...p, avatar }))} />
          <CoverUploader onChange={(cover) => setProfile((p) => ({ ...p, cover }))} />
          <SlugEditor
            value={profile.slug}
            onChange={(slug) => setProfile((p) => ({ ...p, slug: slug.replace(/\s+/g, '-').toLowerCase() }))}
            valid={slugValid}
            base="https://basis.app/"
          />
          <div>
            <label className="block font-semibold mb-1">Блоки профиля</label>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="blocks">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                    {profile.blocks.map((block, i) => (
                      <Draggable key={i} draggableId={String(i)} index={i}>
                        {(provided) => (
                          <div
                            className="bg-gray-50 border rounded p-2 mb-1 relative"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs uppercase">{block.type}</span>
                              <Button onClick={() => removeBlock(i)} className="text-red-600 p-1 text-xs">
                                ×
                              </Button>
                            </div>
                            {block.type === 'button' && (
                              <ButtonLinkEditor
                                value={block.text}
                                url={block.url}
                                onTextChange={(text) => updateBlock(i, { text })}
                                onUrlChange={(url) => updateBlock(i, { url })}
                              />
                            )}
                            {block.type === 'text' && (
                              <RichTextEditor value={block.text} onChange={(text) => updateBlock(i, { text })} />
                            )}
                            {block.type === 'divider' && <hr className="my-2 border-gray-300" />}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex gap-2 mt-2">
              {BLOCK_TYPES.map((b) => (
                <Button key={b.type} onClick={() => addBlock(b.type)} className="p-2 text-xs bg-gray-200 hover:bg-indigo-200">
                  {b.label}
                </Button>
              ))}
            </div>
          </div>
          <ProfileLayoutSelector value={profile.layout} onChange={(layout) => setProfile((p) => ({ ...p, layout }))} />
          <div>
            <label className="block mb-1 font-semibold">Цветовая тема</label>
            <input
              type="color"
              className="w-12 h-8 border rounded"
              value={profile.color}
              onChange={(e) => setProfile((p) => ({ ...p, color: e.target.value }))}
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving || !slugValid}
            aria-busy={saving}
            className="mt-6 px-5 py-3 w-full bg-indigo-600 text-white rounded font-bold flex items-center justify-center"
          >
            {saving && <Spinner size="h-4 w-4" className="mr-2" />}
            {saving ? 'Сохраняем…' : 'Сохранить профиль'}
          </Button>
        </aside>
        <main className="flex-1 bg-white rounded-xl border shadow p-6">
          <div className="overflow-hidden rounded-xl border mb-6">
            {profile.cover && <img src={profile.cover} alt="cover" className="w-full h-32 object-cover" />}
            <div className="p-4 text-center relative">
              {profile.avatar && (
                <img
                  src={profile.avatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-white shadow absolute left-1/2 -translate-x-1/2 -top-12 bg-white"
                />
              )}
              <div className="mt-16">
                <div className="font-bold text-xl mb-1">/u/{profile.slug || 'ваш-адрес'}</div>
                <div className={`flex flex-col gap-2 mt-3 ${profile.layout === 'grid' ? 'md:grid md:grid-cols-2' : ''}`}>
                  {profile.blocks.map((block, i) =>
                    block.type === 'button' ? (
                      <a
                        key={i}
                        href={block.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block px-4 py-2 text-center rounded font-semibold transition-colors ${
                          block.style === 'primary'
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : block.style === 'secondary'
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'border-2 border-gray-400 text-gray-800 hover:bg-gray-100'
                        }`}
                        style={{ background: block.style === 'primary' ? profile.color : undefined }}
                      >
                        {block.text}
                      </a>
                    ) : block.type === 'text' ? (
                      <div key={i} className="px-3 py-2 text-gray-800 text-left" dangerouslySetInnerHTML={{ __html: block.text }} />
                    ) : block.type === 'divider' ? (
                      <hr key={i} className="border-gray-300 my-2" />
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            <a href={`/u/${profile.slug}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-600">
              Перейти к своей странице →
            </a>
          </div>
        </main>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </StandardPageLayout>
  );
};

export default ProfileCustomizationPage;
