import React, { useEffect } from 'react';
import { StandardPageLayout } from '../App';
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { fetchJson } from '../services/api';
import { z } from 'zod';
import { Loader } from '../components/Loader';

const ProjectCardPlaceholder: React.FC<{
  title: string;
  lastUpdated: string;
}> = ({ title, lastUpdated }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
    <h3 className="text-lg font-semibold font-pragmatica text-gray-800">
      {title}
    </h3>
    <p className="text-sm text-gray-500 mb-3">
      Последнее обновление: {lastUpdated}
    </p>
    <div className="space-x-2">
      <Link
        to="/editor"
        state={{ projectId: title }}
        className="text-sm text-indigo-600 hover:text-indigo-800"
      >
        Редактировать
      </Link>
      <button className="text-sm text-gray-600 hover:text-gray-800">
        Настройки
      </button>
      <button className="text-sm text-red-500 hover:text-red-700">
        Удалить
      </button>
    </div>
    {/* Placeholder for clone/archive */}
    <div className="mt-2 text-xs">
      <button className="text-gray-400 hover:text-gray-600 mr-2">
        Клонировать
      </button>
      <button className="text-gray-400 hover:text-gray-600">
        Архивировать
      </button>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  const schema = z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      lastUpdated: z.string(),
    })
  );

  const {
    data: projects,
    loading,
    run,
  } = useAsync(() => fetchJson('/api/projects', schema));

  useEffect(() => {
    run();
  }, [run]);

  return (
    <StandardPageLayout title="3. Dashboard">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            {/* Placeholder for project switcher/tabs */}
            <select className="p-2 border border-gray-300 rounded-md bg-white shadow-sm">
              <option>Все проекты</option>
              <option>Активные</option>
              <option>Архивные</option>
            </select>
          </div>
          <Link
            to="/editor"
            state={{ newProject: true }}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors w-full sm:w-auto text-center"
          >
            Создать новую страницу
          </Link>
        </div>

        <section>
          <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
            Список ваших страниц/проектов
          </h2>
          {loading && <Loader />}
          {!loading && projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCardPlaceholder
                  key={project.id}
                  title={project.title}
                  lastUpdated={project.lastUpdated}
                />
              ))}
            </div>
          ) : !loading ? (
            <p className="text-gray-600">
              У вас пока нет созданных страниц. Начните с создания новой!
            </p>
          ) : null}
        </section>

        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
          <section>
            <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
              Быстрые настройки
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-indigo-600 hover:underline">
                  Настройки аккаунта
                </Link>
              </li>
              <li>
                <Link
                  to="/account#security"
                  className="text-indigo-600 hover:underline"
                >
                  Безопасность
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
              Тарифы и Подписка
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Ваш текущий тариф:{' '}
              <span className="font-semibold text-green-600">Free</span>
            </p>
            <Link to="/billing" className="text-indigo-600 hover:underline">
              Управление подпиской и тарифами
            </Link>
          </section>
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default DashboardPage;
