import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StandardPageLayout from '../layouts/StandardPageLayout';
import useAuth from '../hooks/useAuth';
import useNotification from '../hooks/useNotification';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  socialProfile?: string;
  twoFactorEnabled: boolean;
  subscription: {
    plan: string;
    status: string;
  };
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  ip?: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed?: string;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
    <span className="ml-3 text-gray-600">Загрузка...</span>
  </div>
);

const ErrorMessage: React.FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex items-center">
      <span className="text-red-500 text-xl mr-3">⚠️</span>
      <div>
        <p className="text-red-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Попробовать снова
          </button>
        )}
      </div>
    </div>
  </div>
);

const SuccessMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
    <div className="flex items-center">
      <span className="text-green-500 text-xl mr-3">✅</span>
      <p className="text-green-700">{message}</p>
    </div>
  </div>
);

const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}> = ({ title, children, loading, error, onRetry }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    {loading ? <LoadingSpinner /> : error ? <ErrorMessage message={error} onRetry={onRetry} /> : children}
  </div>
);

const AccountSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, updateUser } = useAuth();
  const { showNotification } = useNotification();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState<Record<string, string>>({});

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    socialProfile: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [userResponse, activityResponse, apiKeysResponse] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/user/activity'),
        fetch('/api/user/api-keys'),
      ]);

      if (!userResponse.ok) throw new Error('Ошибка загрузки профиля');
      if (!activityResponse.ok) throw new Error('Ошибка загрузки активности');
      if (!apiKeysResponse.ok) throw new Error('Ошибка загрузки API ключей');

      const userData = await userResponse.json();
      const activityData = await activityResponse.json();
      const apiKeysData = await apiKeysResponse.json();

      setUserData(userData);
      setActivityLogs(activityData.logs || []);
      setApiKeys(apiKeysData.keys || []);

      setProfileForm({
        name: userData.name || '',
        email: userData.email || '',
        socialProfile: userData.socialProfile || '',
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      setErrors({ general: 'Ошибка загрузки данных. Попробуйте обновить страницу.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving({ ...saving, profile: true });
    setErrors({ ...errors, profile: '' });
    setSuccess({ ...success, profile: '' });

    try {
      if (!profileForm.name.trim()) {
        throw new Error('Имя не может быть пустым');
      }
      if (!profileForm.email.includes('@')) {
        throw new Error('Некорректный email адрес');
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сохранения');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      await updateUser?.(updatedUser);

      setSuccess({ ...success, profile: 'Профиль успешно обновлен!' });
      showNotification('Профиль обновлен', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка сохранения';
      setErrors({ ...errors, profile: message });
      showNotification(message, 'error');
    } finally {
      setSaving({ ...saving, profile: false });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving({ ...saving, password: true });
    setErrors({ ...errors, password: '' });
    setSuccess({ ...success, password: '' });

    try {
      if (passwordForm.newPassword.length < 8) {
        throw new Error('Пароль должен содержать минимум 8 символов');
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }

      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка смены пароля');
      }

      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess({ ...success, password: 'Пароль успешно изменен!' });
      showNotification('Пароль изменен', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка смены пароля';
      setErrors({ ...errors, password: message });
      showNotification(message, 'error');
    } finally {
      setSaving({ ...saving, password: false });
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setSaving({ ...saving, avatar: true });
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Ошибка загрузки аватара');

      const result = await response.json();
      setUserData((prev) => (prev ? { ...prev, avatar: result.avatarUrl } : null));
      showNotification('Аватар обновлен', 'success');
    } catch (error) {
      showNotification('Ошибка загрузки аватара', 'error');
    } finally {
      setSaving({ ...saving, avatar: false });
    }
  };

  const toggle2FA = async () => {
    setSaving({ ...saving, twoFactor: true });
    try {
      const response = await fetch('/api/user/2fa/toggle', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Ошибка настройки 2FA');

      const result = await response.json();
      setUserData((prev) => (prev ? { ...prev, twoFactorEnabled: result.enabled } : null));
      showNotification(result.enabled ? '2FA включена' : '2FA отключена', 'success');
    } catch (error) {
      showNotification('Ошибка настройки 2FA', 'error');
    } finally {
      setSaving({ ...saving, twoFactor: false });
    }
  };

  const generateApiKey = async () => {
    setSaving({ ...saving, apiKey: true });
    try {
      const response = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Key ${Date.now()}` }),
      });

      if (!response.ok) throw new Error('Ошибка генерации API ключа');

      const newKey = await response.json();
      setApiKeys((prev) => [...prev, newKey]);
      showNotification('API ключ создан', 'success');
    } catch (error) {
      showNotification('Ошибка создания API ключа', 'error');
    } finally {
      setSaving({ ...saving, apiKey: false });
    }
  };

  if (authLoading || loading) {
    return (
      <StandardPageLayout title="Настройки аккаунта">
        <LoadingSpinner />
      </StandardPageLayout>
    );
  }

  if (!isAuthenticated || !userData) {
    return (
      <StandardPageLayout title="Доступ запрещен">
        <ErrorMessage message="Необходимо войти в систему для доступа к настройкам аккаунта" />
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout
      title="Настройки аккаунта"
      description="Управление профилем, безопасностью и настройками аккаунта"
      breadcrumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Настройки аккаунта', href: '/account/settings' },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <SectionCard title="Основная информация" loading={saving.profile} error={errors.profile}>
          {success.profile && <SuccessMessage message={success.profile} />}
          <form onSubmit={handleSaveProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="socialProfile" className="block text-sm font-medium text-gray-700">
                    Профиль в соцсети
                  </label>
                  <input
                    type="url"
                    id="socialProfile"
                    value={profileForm.socialProfile}
                    onChange={(e) => setProfileForm({ ...profileForm, socialProfile: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving.profile}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving.profile ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Аватар</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                      {userData.avatar ? <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" /> : 'Фото'}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAvatarUpload(file);
                        }}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label htmlFor="avatar-upload" className="cursor-pointer text-sm text-indigo-600 hover:underline">
                        {saving.avatar ? 'Загрузка...' : 'Загрузить новый'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Безопасность" loading={saving.password || saving.twoFactor} error={errors.password}>
          {success.password && <SuccessMessage message={success.password} />}
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-4">Смена пароля</h4>
              <form onSubmit={handleChangePassword}>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Текущий пароль
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      Новый пароль
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      minLength={8}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Подтвердите новый пароль
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving.password}
                    className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving.password ? 'Изменение...' : 'Изменить пароль'}
                  </button>
                </div>
              </form>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Двухфакторная аутентификация (2FA)</h4>
              <p className="text-sm text-gray-600 mb-4">
                Статус:{' '}
                <span className={`font-semibold ${userData.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`}>{
                  userData.twoFactorEnabled ? 'Включена' : 'Отключена'
                }</span>
              </p>
              <button
                onClick={toggle2FA}
                disabled={saving.twoFactor}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving.twoFactor ? 'Обновление...' : userData.twoFactorEnabled ? 'Отключить 2FA' : 'Включить 2FA'}
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Управление подпиской">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Ваш текущий тариф:{' '}
              <span className="font-semibold text-green-600">{userData.subscription.plan}</span>
            </p>
            <p className="text-sm text-gray-600">
              Статус:{' '}
              <span className={`font-semibold ${userData.subscription.status === 'active' ? 'text-green-600' : 'text-orange-600'}`}>{
                userData.subscription.status === 'active' ? 'Активен' : 'Неактивен'
              }</span>
            </p>
            <button
              onClick={() => navigate('/billing')}
              className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
            >
              Управлять подпиской
            </button>
          </div>
        </SectionCard>

        <SectionCard title="История активности">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Последние действия в вашем аккаунте:</p>
            {activityLogs.length > 0 ? (
              <div className="space-y-2">
                {activityLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    <span className="font-medium">{log.action}</span>
                    <span className="text-gray-500"> - {new Date(log.timestamp).toLocaleString()}</span>
                    {log.ip && <span className="text-gray-400"> (IP: {log.ip})</span>}
                  </div>
                ))}
                <button onClick={() => navigate('/account/activity')} className="text-sm text-indigo-600 hover:underline">
                  Посмотреть всю историю
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">История активности пуста</p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="API и Интеграции">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-4">API-ключи</h4>
              {apiKeys.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{key.name}</span>
                        <span className="text-sm text-gray-500 ml-2">Создан: {new Date(key.created).toLocaleDateString()}</span>
                        {key.lastUsed && (
                          <span className="text-sm text-gray-500 ml-2">Последнее использование: {new Date(key.lastUsed).toLocaleDateString()}</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setApiKeys((prev) => prev.filter((k) => k.id !== key.id));
                        }}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 mb-4">У вас нет активных API-ключей.</p>
              )}
              <button
                onClick={generateApiKey}
                disabled={saving.apiKey}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving.apiKey ? 'Генерация...' : 'Сгенерировать API-ключ'}
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    </StandardPageLayout>
  );
};

export default AccountSettingsPage;
