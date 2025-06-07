import React from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';

const EditorPage: React.FC = () => {
  return (
    // We use StandardPageLayout to keep the header, but the actual editor might need a more custom full-height layout.
    // For this placeholder, we'll fit it within the standard content area.
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
              <button className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                Сохранить
              </button>
              <button className="px-3 py-1.5 text-xs bg-green-500 text-white rounded hover:bg-green-600">
                Опубликовать
              </button>
              <button className="px-3 py-1.5 text-xs bg-gray-500 text-white rounded hover:bg-gray-600">
                Предпросмотр
              </button>
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
          <div className="flex-1 p-4 flex items-center justify-center overflow-auto">
            <div className="w-full max-w-3xl h-full bg-white shadow-inner border border-dashed border-gray-400 rounded-md flex items-center justify-center">
              <p className="text-gray-500 text-lg">
                Drag & Drop интерфейс (Канва)
              </p>
            </div>
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
