import { Helmet } from 'react-helmet-async';

export const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Моё портфолио - Portfolio Builder</title>
        <meta
          name="description"
          content="Просмотр и редактирование вашего профессионального портфолио"
        />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Моё портфолио</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ваши проекты
          </h2>
          <p className="text-gray-600 mb-6">
            Здесь будут отображаться все ваши проекты
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Добавить проект
          </button>
        </div>
      </main>
    </div>
  );
};
