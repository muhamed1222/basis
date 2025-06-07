import React, { useState } from 'react';
import { StandardPageLayout } from '../App';
import { AvatarUploader } from '../components/AvatarUploader';
import { CoverUploader } from '../components/CoverUploader';
import { SlugEditor } from '../components/SlugEditor';
import { ButtonLinkEditor } from '../components/ButtonLinkEditor';
import { RichTextEditor } from '../components/RichTextEditor';
import { ProfileLayoutSelector } from '../components/ProfileLayoutSelector';
import { Toast } from '../components/Toast';
import { registerSlug } from '../services/slugService';

const ProfileCustomizationPage: React.FC = () => {
  const [slug, setSlug] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [description, setDescription] = useState('');
  const [layout, setLayout] = useState('feed');
  const [toast, setToast] = useState<string | null>(null);

  const save = () => {
    registerSlug(slug);
    setToast('Сохранено');
  };

  return (
    <StandardPageLayout title="Персонализация профиля">
      <div className="space-y-6">
        <AvatarUploader />
        <CoverUploader />
        <SlugEditor base="https://basis.app/" />
        <ButtonLinkEditor value={buttonText} onChange={setButtonText} placeholder="Текст кнопки" />
        <RichTextEditor value={description} onChange={setDescription} />
        <ProfileLayoutSelector value={layout} onChange={setLayout} />
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={save}>
          Сохранить
        </button>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </StandardPageLayout>
  );
};

export default ProfileCustomizationPage;
