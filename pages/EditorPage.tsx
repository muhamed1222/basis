import React, { useState } from 'react';
import { StandardPageLayout } from '../App';
import { TemplateGallery } from '../components/TemplateGallery';
import { LiveEditor } from '../components/LiveEditor';
import { Tooltip } from '../components/Tooltip';

const EditorPage: React.FC = () => {
  const [template, setTemplate] = useState<string | null>(null);

  if (!template) {
    return (
      <StandardPageLayout title="Выбор шаблона">
        <TemplateGallery onSelect={(id) => setTemplate(id)} />
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title="4. Editor (Редактор страницы)">
      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-250px)] min-h-[500px]">
        {' '}
        {/* Approximate height */}
        {/* Left Sidebar: Block Palette & Layers */}
        <aside className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold font-pragmatica mb-2">
              Добавить блоки
            </h3>
            <ul className="space-y-1 text-sm">
              {[
                'Текст',
                'Изображение',
                'Колонка',
                'Кнопка',
                'Видео',
                'Карта',
                'Форма',
              ].map((block) => (
                <li
                  key={block}
                  className="p-2 border rounded bg-white hover:bg-gray-50 cursor-grab"
                >
                  {block}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-pragmatica mb-2">
              Слои страницы
            </h3>
            <p className="text-xs text-gray-500">
              (Здесь будет список слоев/блоков на странице)
            </p>
          </div>
        </aside>
        {/* Center: Canvas Area & Top Controls */}
        <main className="flex-1 flex flex-col bg-gray-200 rounded-lg shadow">
          {/* Top Controls for Editor */}
          <div className="bg-white p-2 border-b border-gray-300 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Tooltip text="Сохранить изменения">
                <button className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                  Сохранить
                </button>
              </Tooltip>
              <Tooltip text="Опубликовать страницу">
                <button className="px-3 py-1.5 text-xs bg-green-500 text-white rounded hover:bg-green-600">
                  Опубликовать
                </button>
              </Tooltip>
              <Tooltip text="Посмотреть как выглядит страница">
                <button className="px-3 py-1.5 text-xs bg-gray-500 text-white rounded hover:bg-gray-600">
                  Предпросмотр
                </button>
              </Tooltip>
            </div>
            <div className="flex items-center space-x-2">
              {/* Undo/Redo Placeholder */}
              <button className="p-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded">
                Undo
              </button>
              <button className="p-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded">
                Redo
              </button>
            </div>
            <div>
              <select className="text-xs p-1.5 border rounded-md">
                <option>Публичная</option>
                <option>Приватная</option>
                <option>По ссылке</option>
              </select>
            </div>
          </div>
          {/* Canvas */}
          <div className="flex-1 p-4 overflow-auto">
            <LiveEditor />
          </div>
        </main>
        {/* Right Sidebar: Customization & Settings */}
        <aside className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold font-pragmatica mb-2">
              Кастомизация
            </h3>
            <ul className="space-y-1 text-sm">
              <li>Цвета</li>
              <li>Сетка</li>
              <li>Темы</li>
              <li>Шрифты</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-pragmatica mb-2">
              Интеграции
            </h3>
            <p className="text-xs text-gray-500">
              (Настройки Google Analytics, etc.)
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-pragmatica mb-2">
              Настройки SEO
            </h3>
            <p className="text-xs text-gray-500">
              (Title, Description, Keywords)
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-pragmatica mb-2">
              История изменений
            </h3>
            <p className="text-xs text-gray-500">(Список версий страницы)</p>
          </div>
        </aside>
      </div>
    </StandardPageLayout>
  );
};

export default EditorPage;
