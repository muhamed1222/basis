import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  LinkIcon,
  PhotoIcon,
  ChatBubbleLeftEllipsisIcon,
} from './icons/IconComponents';
import { CSS } from '@dnd-kit/utilities';

interface Block {
  id: string;
  content: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const DraggableBlock: React.FC<{ block: Block }> = ({ block }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    background: 'var(--block-bg, #fff)',
    color: 'var(--block-text, #000)',
    fontFamily: 'var(--block-font, inherit)',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded shadow mb-2 border ${isDragging ? 'bg-gray-200' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2">
        {block.icon &&
          React.createElement(block.icon, { className: 'w-4 h-4' })}
        <span>{block.content}</span>
      </div>
    </div>
  );
};

export const BlockEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', content: 'Первый блок', icon: LinkIcon },
    { id: '2', content: 'Второй блок', icon: PhotoIcon },
    { id: '3', content: 'Третий блок', icon: ChatBubbleLeftEllipsisIcon },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
          setBlocks((items) => {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }}
    >
      <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
        {blocks.map((block) => (
          <DraggableBlock key={block.id} block={block} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
