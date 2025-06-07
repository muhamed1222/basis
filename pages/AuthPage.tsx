import React from 'react';
import { StandardPageLayout } from '../App';
import { Link, useLocation } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const action = queryParams.get('action') || 'login'; // Default to 'login'

  return (
    <StandardPageLayout title="2. Authentication">
      <div className="max-w-md mx-auto mt-2">
        {' '}
        {/* Reduced top margin */}
        {action === 'login' && (
          <form className="space-y-6 p-6 sm:p-8 border rounded-lg shadow-xl bg-white">
            <h3 className="text-2xl font-semibold text-center font-pragmatica">
              Вход в Basis
            </h3>
            <div>
              <label
                htmlFor="email-login"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email-login"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password-login"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>
              <input
                type="password"
                id="password-login"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Войти
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">или</span>
              </div>
            </div>
            {/* Placeholder for Social Logins */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {/* Placeholder Google Icon */}
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.69,5.36 16.95,6.57L19.03,4.5C17.07,2.72 14.92,1.5 12.19,1.5C7.03,1.5 3,5.58 3,12C3,18.42 7.03,22.5 12.19,22.5C17.6,22.5 21.74,18.72 21.74,12.33C21.74,11.77 21.52,11.41 21.35,11.1Z" />
                </svg>
                Войти через Google
              </button>
              {/* Add more social login buttons as needed */}
            </div>
            <p className="text-sm text-center mt-4">
              <Link
                to="/auth?action=reset"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Забыли пароль?
              </Link>
            </p>
            <p className="text-sm text-center">
              Нет аккаунта?{' '}
              <Link
                to="/auth?action=signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Зарегистрироваться
              </Link>
            </p>
          </form>
        )}
        {action === 'signup' && (
          <form className="space-y-6 p-6 sm:p-8 border rounded-lg shadow-xl bg-white">
            <h3 className="text-2xl font-semibold text-center font-pragmatica">
              Создать аккаунт
            </h3>
            <div>
              <label
                htmlFor="name-signup"
                className="block text-sm font-medium text-gray-700"
              >
                Имя
              </label>
              <input
                type="text"
                id="name-signup"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ваше Имя"
              />
            </div>
            <div>
              <label
                htmlFor="email-signup"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email-signup"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password-signup"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>
              <input
                type="password"
                id="password-signup"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Зарегистрироваться
            </button>
            <p className="text-xs text-center text-gray-500">
              Нажимая “Зарегистрироваться”, вы соглашаетесь с нашими{' '}
              <Link
                to="/legal#terms"
                className="underline hover:text-indigo-500"
              >
                Условиями
              </Link>{' '}
              и{' '}
              <Link
                to="/legal#privacy"
                className="underline hover:text-indigo-500"
              >
                Политикой конфиденциальности
              </Link>
              .
            </p>
            <p className="text-sm text-center mt-4">
              Уже есть аккаунт?{' '}
              <Link
                to="/auth?action=login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Войти
              </Link>
            </p>
          </form>
        )}
        {action === 'reset' && (
          <form className="space-y-6 p-6 sm:p-8 border rounded-lg shadow-xl bg-white">
            <h3 className="text-2xl font-semibold text-center font-pragmatica">
              Восстановление пароля
            </h3>
            <p className="text-sm text-center text-gray-600">
              Введите email, связанный с вашим аккаунтом, и мы отправим вам
              ссылку для сброса пароля.
            </p>
            <div>
              <label
                htmlFor="email-reset"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email-reset"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Отправить ссылку для сброса
            </button>
            <p className="text-sm text-center mt-4">
              <Link
                to="/auth?action=login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Вернуться ко входу
              </Link>
            </p>
          </form>
        )}
      </div>
    </StandardPageLayout>
  );
};

export default AuthPage;
