// Mock data - replace with real data from API
const mockProjects = [
  { id: '1', title: 'Проект 1', description: 'Описание проекта', image: null },
  { id: '2', title: 'Проект 2', description: 'Описание проекта', image: null },
  { id: '3', title: 'Проект 3', description: 'Описание проекта', image: null },
];

export const ProjectShowcaseGrid: React.FC = () => {
  return (
    <div className="w-full max-w-4xl space-y-6">
      <h2 className="text-xl font-bold text-gray-900 px-4 py-3 bg-white rounded-lg shadow-sm">
        Мои проекты
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gray-100 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-400">Изображение</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};