import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProjectShowcaseGrid } from '../components/ProjectShowcaseGrid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProjects } from '../store/slices/portfolioSlice';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Portfolio Builder - Создайте идеальное портфолио</title>
        <meta
          name="description"
          content="Создайте профессиональное портфолио за минуты с помощью ИИ"
        />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Создайте идеальное портфолио
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Начните с выбора шаблона
          </h2>
          <p className="text-gray-600 mb-6">
            Выберите один из наших готовых шаблонов или создайте свой собственный
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Выбрать шаблон
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Последние работы</h2>
          <ProjectShowcaseGrid projects={projects} />
        </div>
      </main>
    </div>
  );
};
