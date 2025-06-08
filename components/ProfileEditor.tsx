import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { Button } from '../ui/Button';
import { Toast } from './Toast';

interface Props {
  userId: string;
  onSaveSuccess?: () => void;
  onError?: (err: unknown) => void;
}

const defaultProfile: UserProfile = { name: '', email: '', bio: '' };

export const ProfileEditor: React.FC<Props> = ({
  userId,
  onSaveSuccess,
  onError,
}) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [originalProfile, setOriginalProfile] = useState<UserProfile>(defaultProfile);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load profile on mount
  useEffect(() => {
    const saved = localStorage.getItem(`profile_${userId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setProfile(data);
        setOriginalProfile(data);
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    }
  }, [userId]);

  const hasUnsavedChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleChange = (field: keyof UserProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      localStorage.setItem(`profile_${userId}`, JSON.stringify(profile));
      setOriginalProfile(profile);
      setToast('Профиль сохранен');
      onSaveSuccess?.();
    } catch (err) {
      setToast('Ошибка при сохранении');
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  const isFieldChanged = (field: keyof UserProfile) => {
    return originalProfile[field] !== profile[field];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button onClick={handleSave} disabled={loading || !hasUnsavedChanges}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>
        <span className="text-sm text-gray-600">
          {hasUnsavedChanges ? 'Есть несохраненные изменения' : 'Все изменения сохранены'}
        </span>
      </div>

      <div className="space-y-4">
        <label className={`block ${isFieldChanged('name') ? 'bg-yellow-50 p-2 rounded' : ''}`}>
          <span className="block text-sm font-medium text-gray-700 mb-1">Имя</span>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={profile.name}
            onChange={handleChange('name')}
            placeholder="Введите ваше имя"
          />
        </label>

        <label className={`block ${isFieldChanged('email') ? 'bg-yellow-50 p-2 rounded' : ''}`}>
          <span className="block text-sm font-medium text-gray-700 mb-1">Email</span>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={profile.email}
            onChange={handleChange('email')}
            placeholder="Введите ваш email"
          />
        </label>

        <label className={`block ${isFieldChanged('bio') ? 'bg-yellow-50 p-2 rounded' : ''}`}>
          <span className="block text-sm font-medium text-gray-700 mb-1">Биография</span>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={profile.bio}
            onChange={handleChange('bio')}
            placeholder="Расскажите о себе"
          />
        </label>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};