import React from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Link } from 'react-router-dom';

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <h3 className="text-xl font-semibold font-pragmatica text-gray-800 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const FormField: React.FC<{
  label: string;
  type: string;
  id: string;
  value?: string;
  placeholder?: string;
}> = ({ label, type, id, value, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      defaultValue={value}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

const AccountSettingsPage: React.FC = () => {
  return (
    <StandardPageLayout title="6. Account Settings">
      <div className="space-y-8">
        <SectionCard title="Основная информация">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                label="Имя"
                type="text"
                id="name"
                value="Текущее Имя"
              />
              <FormField
                label="Email"
                type="email"
                id="email"
                value="user@example.com"
              />
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
              >
                Сохранить изменения
              </button>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Аватар
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                  Фото
                </div>
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Загрузить новый
                </button>
              </div>
              <FormField
                label="Профиль в соцсети (пример)"
                type="url"
                id="social_profile"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Безопасность">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800">Смена пароля</h4>
              <FormField
                label="Текущий пароль"
                type="password"
                id="current_password"
                placeholder="••••••••"
              />
              <FormField
                label="Новый пароль"
                type="password"
                id="new_password"
                placeholder="••••••••"
              />
              <FormField
                label="Подтвердите новый пароль"
                type="password"
                id="confirm_password"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600"
              >
                Изменить пароль
              </button>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                Двухфакторная аутентификация (2FA)
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Статус:{' '}
                <span className="font-semibold text-green-600">Включена</span>
              </p>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
              >
                Управлять 2FA
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Управление подпиской">
          <p className="text-sm text-gray-600 mb-2">
            Ваш текущий тариф:{' '}
            <span className="font-semibold text-green-600">Pro Plan</span>
          </p>
          <Link
            to="/billing"
            className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
          >
            Перейти к оплате и тарифам
          </Link>
        </SectionCard>

        <SectionCard title="История активности">
          <p className="text-sm text-gray-600 mb-2">
            Последние действия в вашем аккаунте:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
            <li>Вход в систему с IP 192.168.1.1 (Сегодня, 10:15)</li>
            <li>Страница "Мое Портфолио v1" обновлена (Вчера, 18:30)</li>
            <li>Изменен email аккаунта (05.07.2024)</li>
          </ul>
          <a
            href="#"
            className="text-sm text-indigo-600 hover:underline mt-2 inline-block"
          >
            Посмотреть всю историю
          </a>
        </SectionCard>

        <SectionCard title="API и Интеграции">
          <div>
            <h4 className="font-medium text-gray-800">API-ключи</h4>
            <p className="text-sm text-gray-600 mb-2">
              У вас нет активных API-ключей.
            </p>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
            >
              Сгенерировать API-ключ
            </button>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-gray-800">Webhooks</h4>
            <p className="text-sm text-gray-600 mb-2">
              Настройте webhooks для получения уведомлений о событиях.
            </p>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
            >
              Управлять Webhooks
            </button>
          </div>
        </SectionCard>
      </div>
    </StandardPageLayout>
  );
};

export default AccountSettingsPage;
