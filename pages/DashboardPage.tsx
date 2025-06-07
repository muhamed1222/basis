import React, { useEffect, useState } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, deleteProject, archiveProject, cloneProject, Project } from '../services/projects';
import { Onboarding } from '../components/Onboarding';
import useNotification from '../hooks/useNotification';

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onClone: () => void;
  deleting: boolean;
  archiving: boolean;
  cloning: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onArchive,
  onClone,
  deleting,
  archiving,
  cloning,
}) => {
  const { showNotification } = useNotification();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 relative">
      <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
      <p className="text-sm text-gray-500 mb-3">Последнее обновление: {project.lastUpdated}</p>
      <div className="flex flex-wrap gap-2">
        <button className="text-sm text-indigo-600 hover:text-indigo-800" onClick={onEdit} aria-label="Редактировать">
          Редактировать
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-800" onClick={onArchive} aria-label="Архивировать" disabled={archiving}>
          {archiving ? 'Архивируем...' : 'Архивировать'}
        </button>
        <button className="text-sm text-green-700 hover:text-green-900" onClick={onClone} aria-label="Клонировать" disabled={cloning}>
          {cloning ? 'Клонируем...' : 'Клонировать'}
        </button>
        <button className="text-sm text-red-500 hover:text-red-700" onClick={onDelete} aria-label="Удалить" disabled={deleting}>
          {deleting ? 'Удаляем...' : 'Удалить'}
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        ID: {project.id}
        <button
          className="ml-2 text-indigo-400 hover:underline"
          onClick={() => {
            navigator.clipboard.writeText(project.id);
            showNotification('ID скопирован', 'success');
          }}
          aria-label="Скопировать ID"
        >
          копировать
        </button>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [archivingId, setArchivingId] = useState<string | null>(null);
  const [cloningId, setCloningId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    getProjects()
      .then(setProjects)
      .catch(() => setError('Ошибка загрузки проектов'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects
    .filter((p) =>
      filter === 'all' ? true : filter === 'active' ? !p.archived : p.archived,
    )
    .filter((p) =>
      query.length === 0 ? true : p.title.toLowerCase().includes(query.toLowerCase()),
    );

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Вы точно хотите удалить "${project.title}"? Это действие необратимо.`)) return;
    setDeletingId(project.id);
    try {
      await deleteProject(project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      showNotification('Проект удалён', 'success');
    } catch {
      showNotification('Ошибка удаления', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleArchive = async (project: Project) => {
    setArchivingId(project.id);
    try {
      await archiveProject(project.id);
      setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, archived: true } : p)));
      showNotification('Проект архивирован', 'success');
    } catch {
      showNotification('Ошибка архивирования', 'error');
    } finally {
      setArchivingId(null);
    }
  };

  const handleClone = async (project: Project) => {
    setCloningId(project.id);
    try {
      const newProject = await cloneProject(project.id);
      setProjects((prev) => [newProject, ...prev]);
      showNotification('Проект клонирован', 'success');
    } catch {
      showNotification('Ошибка клонирования', 'error');
    } finally {
      setCloningId(null);
    }
  };

  const handleEdit = (project: Project) => {
    navigate('/editor', { state: { projectId: project.id } });
  };

  return (
    <StandardPageLayout title="Дашборд">
      <Onboarding />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              className="p-2 border border-gray-300 rounded-md bg-white shadow-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'archived')}
              aria-label="Фильтр проектов"
            >
              <option value="all">Все проекты</option>
              <option value="active">Активные</option>
              <option value="archived">Архивные</option>
            </select>
            <input
              className="p-2 border border-gray-300 rounded-md ml-2"
              placeholder="Поиск по названию..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Поиск проектов"
            />
          </div>
          <Link
            to="/editor"
            state={{ newProject: true }}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors w-full sm:w-auto text-center"
          >
            Создать новый проект
          </Link>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Ваши проекты</h2>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-gray-100 h-32 rounded-lg animate-pulse" />
                ))}
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : filtered.length === 0 ? (
            <p className="text-gray-600">Проектов не найдено. Попробуйте другой фильтр или создайте первый!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => handleEdit(project)}
                  onDelete={() => handleDelete(project)}
                  onArchive={() => handleArchive(project)}
                  onClone={() => handleClone(project)}
                  deleting={deletingId === project.id}
                  archiving={archivingId === project.id}
                  cloning={cloningId === project.id}
                />
              ))}
            </div>
          )}
        </section>

        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Быстрые настройки</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-indigo-600 hover:underline">
                  Настройки аккаунта
                </Link>
              </li>
              <li>
                <Link to="/account#security" className="text-indigo-600 hover:underline">
                  Безопасность
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Тариф и подписка</h2>
            <p className="text-sm text-gray-600 mb-2">
              Ваш текущий тариф: <span className="font-semibold text-green-600">Free</span>
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
