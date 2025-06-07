import React, { useState, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { useAuth } from '../contexts/AuthContext';

type AuthMode = 'login' | 'signup' | 'reset';
type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 6;

const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const mode = (queryParams.get('action') as AuthMode) || 'login';

  const { login, signup, resetPassword } = useAuth();

  const [fields, setFields] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setFields({ email: '', password: '', name: '', confirmPassword: '' });
    setStatus('idle');
    setErrorMsg(null);
    setSuccessMsg(null);
    emailRef.current?.focus();
  }, [mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const validate = useCallback(() => {
    if (!EMAIL_REGEX.test(fields.email)) return 'Введите корректный email.';
    if ((mode === 'login' || mode === 'signup') && fields.password.length < PASSWORD_MIN)
      return `Пароль не менее ${PASSWORD_MIN} символов.`;
    if (mode === 'signup') {
      if (!fields.name.trim()) return 'Введите имя.';
      if (fields.password !== fields.confirmPassword) return 'Пароли не совпадают.';
    }
    return null;
  }, [fields, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const validation = validate();
    if (validation) {
      setErrorMsg(validation);
      return;
    }
    setStatus('loading');
    try {
      if (mode === 'login') {
        await login(fields.email, fields.password);
        setStatus('success');
        setSuccessMsg('Вход выполнен успешно. Перенаправляю…');
        setTimeout(() => navigate('/'), 1200);
      } else if (mode === 'signup') {
        await signup(fields.email, fields.password, fields.name);
        setStatus('success');
        setSuccessMsg('Регистрация успешна! Войдите под своими данными.');
        setTimeout(() => navigate('/auth?action=login'), 1800);
      } else if (mode === 'reset') {
        await resetPassword(fields.email);
        setStatus('success');
        setSuccessMsg('Письмо для восстановления отправлено на почту.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Произошла ошибка. Проверьте данные и попробуйте снова.');
    }
  };

  const toggleShowPassword = () => setShowPassword((s) => !s);

  return (
    <StandardPageLayout title="Аутентификация">
      <div className="max-w-md mx-auto py-8">
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          aria-label={mode === 'login' ? 'Вход' : mode === 'signup' ? 'Регистрация' : 'Сброс пароля'}
          className="space-y-6 p-7 border rounded-2xl shadow-xl bg-white"
        >
          <h3 className="text-2xl font-semibold text-center mb-2">
            {mode === 'login' ? 'Вход в систему' : mode === 'signup' ? 'Создать аккаунт' : 'Восстановление пароля'}
          </h3>

          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Имя
              </label>
              <input
                ref={mode === 'signup' ? emailRef : undefined}
                type="text"
                id="name"
                name="name"
                required
                autoFocus={mode === 'signup'}
                value={fields.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ваше имя"
                data-testid="signup-name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              ref={mode !== 'signup' ? emailRef : undefined}
              type="email"
              id="email"
              name="email"
              required
              autoFocus={mode !== 'signup'}
              value={fields.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              data-testid="auth-email"
              aria-label="Введите email"
            />
          </div>

          {mode !== 'reset' && (
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required={mode !== 'reset'}
                value={fields.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                placeholder="••••••••"
                data-testid="auth-password"
                aria-label="Введите пароль"
                minLength={PASSWORD_MIN}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                tabIndex={0}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                onClick={toggleShowPassword}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                data-testid="toggle-password"
              >
                {showPassword ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M3 3l18 18M1 1l22 22" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 4C7 4 2.73 7.11 1 12c.62 1.67 1.62 3.21 2.9 4.5l2.12-2.12A7.96 7.96 0 0112 6a7.96 7.96 0 015.98 2.38l2.12-2.12C21.37 7.11 17 4 12 4z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Повторите пароль
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={fields.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
                data-testid="signup-confirm"
                aria-label="Повторите пароль"
                minLength={PASSWORD_MIN}
              />
            </div>
          )}

          {errorMsg && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm flex items-center" role="alert" data-testid="error-msg">
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" />
              </svg>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="text-green-700 bg-green-50 border border-green-200 rounded p-2 text-sm flex items-center" role="status" data-testid="success-msg">
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
              </svg>
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              mode === 'signup'
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : mode === 'reset'
                ? 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
            data-testid="auth-submit"
          >
            {status === 'loading'
              ? 'Обработка…'
              : mode === 'login'
              ? 'Войти'
              : mode === 'signup'
              ? 'Зарегистрироваться'
              : 'Отправить ссылку'}
          </button>

          <div className="flex justify-between mt-2 text-sm">
            {mode !== 'login' && (
              <Link to="/auth?action=login" className="text-indigo-600 hover:underline focus:underline" tabIndex={0}>
                Уже есть аккаунт?
              </Link>
            )}
            {mode !== 'signup' && (
              <Link to="/auth?action=signup" className="text-green-700 hover:underline focus:underline" tabIndex={0}>
                Нет аккаунта?
              </Link>
            )}
            {mode !== 'reset' && (
              <Link to="/auth?action=reset" className="text-orange-600 hover:underline focus:underline" tabIndex={0}>
                Забыли пароль?
              </Link>
            )}
          </div>

          {mode === 'signup' && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Нажимая “Зарегистрироваться”, вы соглашаетесь с{' '}
              <Link to="/legal#terms" className="underline hover:text-indigo-500">
                Условиями
              </Link>{' '}
              и{' '}
              <Link to="/legal#privacy" className="underline hover:text-indigo-500">
                Политикой конфиденциальности
              </Link>
              .
            </p>
          )}
        </form>
      </div>
    </StandardPageLayout>
  );
};

export default AuthPage;
