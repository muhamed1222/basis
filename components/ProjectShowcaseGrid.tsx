import React, { useState, useMemo, useCallback, Suspense, lazy, useEffect } from 'react';
import { useApiQuery } from '../hooks/useApiQuery';

// Ленивая загрузка тяжелых компонентов
const LazyImage = lazy(() => import('./LazyImage'));

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

interface ProjectShowcaseGridProps {
  limit?: number;
  category?: string;
  featured?: boolean;
}

// Мемоизированный фильтр проектов
const useFilteredProjects = (projects: Project[], category?: string, featured?: boolean) => {
  return useMemo(() => {
    if (!projects) return [];

    return projects.filter(project => {
      if (featured && !project.featured) return false;
      if (category && !project.tags.includes(category)) return false;
      return true;
    });
  }, [projects, category, featured]);
};

// Мемоизированная сортировка
const useSortedProjects = (projects: Project[]) => {
  return useMemo(() => {
    return [...projects].sort((a, b) => {
      // Сначала featured проекты
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Потом по дате
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [projects]);
};

const ProjectShowcaseGrid: React.FC<ProjectShowcaseGridProps> = ({
  limit = 12,
  category,
  featured
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: projects, isLoading, error } = useApiQuery<Project[]>('/api/projects', {
    staleTime: 5 * 60 * 1000, // 5 минут
  });

  const filteredProjects = useFilteredProjects(projects || [], category, featured);
  const sortedProjects = useSortedProjects(filteredProjects);

  // Поиск с debounce через useMemo
  const searchedProjects = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return sortedProjects;

    const term = debouncedSearchTerm.toLowerCase();
    return sortedProjects.filter(project => {
      // Защита от null/undefined
      const title = project.title?.toLowerCase() || '';
      const description = project.description?.toLowerCase() || '';
      const tags = project.tags || [];

      return title.includes(term) ||
             description.includes(term) ||
             tags.some(tag => tag?.toLowerCase?.().includes(term));
    });
  }, [sortedProjects, debouncedSearchTerm]);

  const displayedProjects = useMemo(() => 
    searchedProjects.slice(0, limit),
    [searchedProjects, limit]
  );

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (isLoading) {
    return <ProjectGridSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold">Ошибка загрузки проектов</h3>
          <p className="text-gray-600 mt-2">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Поиск */}
      <div className="relative">
        <input
          type="text"
          placeholder="Поиск проектов..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Статистика */}
      <div className="text-sm text-gray-600">
        Показано {displayedProjects.length} из {filteredProjects.length} проектов
      </div>

      {/* Сетка проектов */}
      {displayedProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2" />
            </svg>
            <h3 className="text-lg font-semibold">Проекты не найдены</h3>
            <p className="text-gray-500 mt-2">Попробуйте изменить критерии поиска</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
});

ProjectShowcaseGrid.displayName = 'ProjectShowcaseGrid';

// Компонент карточки проекта
const ProjectCard: React.FC<{ project: Project }> = React.memo(({ project }) => (
  <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
    <div className="aspect-video relative overflow-hidden bg-gray-100">
      <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse" />}>
        <LazyImage
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </Suspense>
      {project.featured && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Рекомендуем
        </div>
      )}
    </div>
    
    <div className="p-4">
      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-xs text-gray-500">+{project.tags.length - 3}</span>
        )}
      </div>
      
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        Посмотреть проект
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </article>
));

ProjectCard.displayName = 'ProjectCard';

// Компонент скелетона
const ProjectGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="aspect-video bg-gray-200 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-5 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProjectShowcaseGrid;