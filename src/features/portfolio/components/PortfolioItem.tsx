import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDeletePortfolioItem } from '../hooks/usePortfolio';
import { PortfolioItem } from '../../shared/types';
import { Button } from '../../shared/components/Button';
import { Image } from '../../shared/components/Image';

interface PortfolioItemProps {
  item: PortfolioItem;
  onDelete: () => void;
}

const PortfolioItemComponent = ({ item, onDelete }: PortfolioItemProps) => {
  const navigate = useNavigate();
  const { mutate: deleteItem } = useDeletePortfolioItem();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      deleteItem(item.id, {
        onSuccess: () => {
          onDelete();
        },
      });
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={item.imageUrl}
          alt={item.title}
          className="object-cover w-full h-full"
          loading="lazy"
          placeholder="blur"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {item.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              as={Link}
              to={`/portfolio/${item.id}`}
            >
              View Details
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export const PortfolioItem = memo(PortfolioItemComponent);
