import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Helmet>
        <title>404 - Страница не найдена</title>
      </Helmet>

      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Страница не найдена
        </h2>
        <p className="text-gray-600 mb-6">
          Кажется, вы заблудлись. Вернитесь на главную страницу.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          На главную
        </Link>
      </div>
    </div>
  );
};
