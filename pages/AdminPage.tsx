import React from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Link } from 'react-router-dom';

const AdminSectionLink: React.FC<{
  to: string;
  title: string;
  description: string;
}> = ({ to, title, description }) => (
  <Link
    to={to}
    className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
  >
    <h3 className="text-lg font-semibold font-pragmatica text-indigo-700 mb-1">
      {title}
    </h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Link>
);

const AdminPage: React.FC = () => {
  // This page would typically be protected by role-based access control
  const isStaff = true; // Placeholder for actual auth check

  if (!isStaff) {
    return (
      <StandardPageLayout title="Access Denied">
        <p>У вас нет прав для доступа к этой странице.</p>
        <Link
          to="/"
          className="text-indigo-600 hover:underline mt-4 inline-block"
        >
          Вернуться на главную
        </Link>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title="10. Admin Panel">
      <div className="space-y-6">
        <p className="text-sm text-gray-500">
          Добро пожаловать в административную панель. Здесь вы можете управлять
          платформой.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <AdminSectionLink
            to="/admin/users"
            title="Управление пользователями"
            description="Просмотр, редактирование и управление аккаунтами пользователей."
          />
          <AdminSectionLink
            to="/admin/pages"
            title="Управление страницами"
            description="Просмотр и управление всеми страницами, созданными на платформе."
          />
          <AdminSectionLink
            to="/admin/moderation"
            title="Модерация публичных страниц"
            description="Проверка и модерация контента на публичных страницах."
          />
          <AdminSectionLink
            to="/admin/stats"
            title="Статистика по платформе"
            description="Обзор ключевых метрик использования платформы."
          />
          <AdminSectionLink
            to="/admin/logs"
            title="Просмотр логов"
            description="Доступ к системным логам и логам ошибок."
          />
          <AdminSectionLink
            to="/admin/security"
            title="Метрики безопасности"
            description="Мониторинг безопасности и инцидентов."
          />
          <AdminSectionLink
            to="/admin/settings"
            title="Настройки платформы"
            description="Глобальные настройки и конфигурация."
          />
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default AdminPage;
