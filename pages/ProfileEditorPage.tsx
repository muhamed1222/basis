import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { ProfileEditor } from '../components/ProfileEditor';
import useAuth from '../hooks/useAuth';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    <span className="ml-3 text-gray-600">Загрузка...</span>
  </div>
);

const ErrorMessage: React.FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-50 rounded-lg p-8">
    <div className="text-red-600 text-xl mb-4">⚠️ Ошибка</div>
    <p className="text-gray-700 text-center mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Попробовать снова
      </button>
    )}
  </div>
);

const ProfileEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error, isAuthenticated, refreshUser } = useAuth();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [loading, isAuthenticated, navigate, location]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleRetry = () => {
    refreshUser?.();
  };

  if (loading) {
    return (
      <StandardPageLayout
        title="Редактирование профиля"
        description="Настройте свой профиль и персональную информацию"
      >
        <LoadingSpinner />
      </StandardPageLayout>
    );
  }

  if (error) {
    return (
      <StandardPageLayout
        title="Ошибка загрузки профиля"
        description="Произошла ошибка при загрузке данных профиля"
      >
        <ErrorMessage
          message="Не удалось загрузить данные профиля. Проверьте подключение к интернету и попробуйте снова."
          onRetry={handleRetry}
        />
      </StandardPageLayout>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <StandardPageLayout
        title="Доступ запрещен"
        description="Необходима авторизация для доступа к этой странице"
      >
        <ErrorMessage message="Для редактирования профиля необходимо войти в систему." />
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout
      title="Редактирование профиля"
      description="Настройте свой профиль и персональную информацию"
      breadcrumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Профиль', href: '/profile' },
        { label: 'Редактирование', href: '/profile/edit' },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Редактирование профиля</h1>
          <p className="text-gray-600">Обновите свои личные данные и настройки аккаунта</p>
        </div>

        {hasUnsavedChanges && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  У вас есть несохраненные изменения. Не забудьте сохранить данные перед выходом.
                </p>
              </div>
            </div>
          </div>
        )}

        <ProfileEditor
          userId={user.id}
          onUnsavedChanges={setHasUnsavedChanges}
          onSaveSuccess={() => setHasUnsavedChanges(false)}
          onError={err => console.error('Profile editor error:', err)}
        />
      </div>
    </StandardPageLayout>
  );
};

export default ProfileEditorPage;
