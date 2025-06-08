import { PortfolioItem } from '@/shared/types/index';

export const ProjectShowcaseGrid = (props: { projects: PortfolioItem[] }) => {
  const { projects } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: PortfolioItem) => (
        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex gap-2">
              {project.tags.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
