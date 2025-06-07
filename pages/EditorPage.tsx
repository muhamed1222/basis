import React, { useState, useRef } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Tooltip } from '../components/Tooltip';
import { Onboarding } from '../components/Onboarding';
import { useToast } from '../components/ToastProvider';
import Spinner from '../ui/Spinner';

// --- Базовые типы блоков ---
const BLOCK_TYPES = [
  { type: 'text', label: 'Текст' },
  { type: 'image', label: 'Изображение' },
  { type: 'button', label: 'Кнопка' },
  { type: 'video', label: 'Видео' },
  { type: 'form', label: 'Форма' },
  { type: 'map', label: 'Карта' },
];

const DEFAULT_BLOCK_PROPS = {
  text: { text: 'Новый текст', color: '#333', bg: '#fff', font: 'sans-serif' },
  image: { src: '', alt: 'Картинка' },
  button: { text: 'Кнопка', color: '#fff', bg: '#2d9' },
  video: { url: '' },
  form: { fields: ['email'] },
  map: { address: '' },
};

interface Block {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

// --- Undo/Redo стэк ---
function useUndoRedo<T>(initial: T) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initial);
  const [future, setFuture] = useState<T[]>([]);
  const set = (val: T) => {
    setPast([...past, present]);
    setPresent(val);
    setFuture([]);
  };
  const undo = () => {
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    setPast(past.slice(0, -1));
    setFuture([present, ...future]);
    setPresent(prev);
  };
  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setPast([...past, present]);
    setFuture(future.slice(1));
    setPresent(next);
  };
  return {
    state: present,
    set,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}

// --- Редактор страницы ---
const EditorPage: React.FC = () => {
  const { showSuccess } = useToast();
  // --- blocks: { id, type, props }
  const {
    state: blocks,
    set: setBlocks,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<Block[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [viewMode, setViewMode] = useState<'public' | 'private' | 'link'>(
    'public'
  );
  const nextId = useRef(1);

  // --- Добавить блок
  const addBlock = (type: string) => {
    const id = `b${nextId.current++}`;
    setBlocks([
      ...blocks,
      { id, type, props: { ...DEFAULT_BLOCK_PROPS[type] } },
    ]);
    setSelectedId(id);
  };

  // --- Изменить блок
  const updateBlock = (id: string, newProps: Record<string, unknown>) => {
    setBlocks(
      blocks.map((b) =>
        b.id === id ? { ...b, props: { ...b.props, ...newProps } } : b
      )
    );
  };

  // --- Удалить блок
  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // --- Drag&Drop
  const moveBlock = (from: number, to: number) => {
    if (from === to) return;
    const newBlocks = [...blocks];
    const [item] = newBlocks.splice(from, 1);
    newBlocks.splice(to, 0, item);
    setBlocks(newBlocks);
  };

  // --- Сохранить (mock)
  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      showSuccess('Страница сохранена');
      setSaving(false);
    }, 600);
  };

  // --- Опубликовать (mock)
  const handlePublish = async () => {
    setPublishing(true);
    setTimeout(() => {
      showSuccess('Страница опубликована!');
      setPublishing(false);
    }, 1000);
  };

  // --- Предпросмотр (mock)
  const handlePreview = () => {
    showSuccess('Открыт предпросмотр страницы');
  };

  // --- Кастомизация выбранного блока
  const selectedBlock = blocks.find((b) => b.id === selectedId);

  return (
    <StandardPageLayout title="Редактор страницы">
      <Onboarding />
      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        {/* --- Левая панель: Блоки и порядок --- */}
        <aside className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold mb-2">Добавить блок</h3>
            <ul className="space-y-1 text-sm">
              {BLOCK_TYPES.map((block) => (
                <li
                  key={block.type}
                  className="p-2 border rounded bg-white hover:bg-green-50 cursor-pointer"
                  onClick={() => addBlock(block.type)}
                  tabIndex={0}
                  aria-label={`Добавить блок: ${block.label}`}
                >
                  {block.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Слои (порядок блоков)
            </h3>
            {blocks.length === 0 ? (
              <p className="text-xs text-gray-400">Нет блоков</p>
            ) : (
              <ul className="space-y-1">
                {blocks.map((b, i) => (
                  <li
                    key={b.id}
                    className={`p-2 flex items-center rounded cursor-pointer ${
                      selectedId === b.id
                        ? 'bg-blue-100 border-blue-400 border'
                        : 'bg-white border'
                    }`}
                    onClick={() => setSelectedId(b.id)}
                  >
                    <span className="flex-1">
                      {BLOCK_TYPES.find((t) => t.type === b.type)?.label ||
                        b.type}
                    </span>
                    <button
                      className="ml-2 text-xs text-gray-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBlock(b.id);
                      }}
                      aria-label="Удалить блок"
                    >
                      ×
                    </button>
                    <button
                      className="ml-2 text-xs text-gray-400 hover:text-indigo-600"
                      disabled={i === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(i, i - 1);
                      }}
                      aria-label="Переместить вверх"
                    >
                      ↑
                    </button>
                    <button
                      className="ml-1 text-xs text-gray-400 hover:text-indigo-600"
                      disabled={i === blocks.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(i, i + 1);
                      }}
                      aria-label="Переместить вниз"
                    >
                      ↓
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
        {/* --- Canvas --- */}
        <main className="flex-1 flex flex-col bg-gray-200 rounded-lg shadow">
          {/* --- Верхние действия --- */}
          <div className="bg-white p-2 border-b border-gray-300 rounded-t-lg flex justify-between items-center gap-2">
            <div className="flex items-center space-x-2">
              <Tooltip text="Сохранить изменения">
                <button
                  className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                  onClick={handleSave}
                  disabled={saving}
                  aria-busy={saving}
                >
                  {saving && <Spinner size="h-4 w-4" className="mr-1" />}
                  {saving ? 'Сохраняем...' : 'Сохранить'}
                </button>
              </Tooltip>
              <Tooltip text="Опубликовать страницу">
                <button
                  className="px-3 py-1.5 text-xs bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
                  onClick={handlePublish}
                  disabled={publishing}
                  aria-busy={publishing}
                >
                  {publishing && <Spinner size="h-4 w-4" className="mr-1" />}
                  {publishing ? 'Публикуем...' : 'Опубликовать'}
                </button>
              </Tooltip>
              <Tooltip text="Посмотреть как выглядит страница">
                <button
                  className="px-3 py-1.5 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={handlePreview}
                >
                  Предпросмотр
                </button>
              </Tooltip>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="p-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded"
                onClick={undo}
                disabled={!canUndo}
              >
                Undo
              </button>
              <button
                className="p-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded"
                onClick={redo}
                disabled={!canRedo}
              >
                Redo
              </button>
            </div>
            <div>
              <select
                className="text-xs p-1.5 border rounded-md"
                value={viewMode}
                onChange={(e) =>
                  setViewMode(e.target.value as 'public' | 'private' | 'link')
                }
              >
                <option value="public">Публичная</option>
                <option value="private">Приватная</option>
                <option value="link">По ссылке</option>
              </select>
            </div>
          </div>
          {/* --- Канвас --- */}
          <div className="flex-1 p-6 overflow-auto bg-gray-100 rounded-b-lg min-h-[320px]">
            {blocks.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                <p>Добавь блок для начала работы</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blocks.map((b) => (
                  <div
                    key={b.id}
                    className={`rounded p-4 shadow-sm cursor-pointer ${
                      selectedId === b.id
                        ? 'ring-2 ring-blue-400 bg-white'
                        : 'bg-white'
                    }`}
                    onClick={() => setSelectedId(b.id)}
                  >
                    {b.type === 'text' && (
                      <input
                        className="w-full bg-transparent text-lg font-medium"
                        value={b.props.text}
                        onChange={(e) =>
                          updateBlock(b.id, { text: e.target.value })
                        }
                        style={{
                          color: b.props.color,
                          background: b.props.bg,
                          fontFamily: b.props.font,
                        }}
                      />
                    )}
                    {b.type === 'image' && (
                      <div>
                        <input
                          type="text"
                          placeholder="Ссылка на картинку"
                          className="w-full text-sm mb-2"
                          value={b.props.src}
                          onChange={(e) =>
                            updateBlock(b.id, { src: e.target.value })
                          }
                        />
                        {b.props.src && (
                          <img
                            src={b.props.src}
                            alt={b.props.alt}
                            className="max-w-full h-32 object-contain border"
                          />
                        )}
                      </div>
                    )}
                    {b.type === 'button' && (
                      <button
                        className="px-5 py-2 rounded"
                        style={{
                          background: b.props.bg,
                          color: b.props.color,
                        }}
                      >
                        {b.props.text}
                      </button>
                    )}
                    {b.type === 'video' && (
                      <input
                        type="text"
                        placeholder="Ссылка на видео (YouTube/Vimeo)"
                        className="w-full text-sm"
                        value={b.props.url}
                        onChange={(e) =>
                          updateBlock(b.id, { url: e.target.value })
                        }
                      />
                    )}
                    {b.type === 'form' && (
                      <div>
                        <span className="text-xs text-gray-600">
                          Поля: {b.props.fields.join(', ')}
                        </span>
                      </div>
                    )}
                    {b.type === 'map' && (
                      <input
                        type="text"
                        placeholder="Адрес или координаты"
                        className="w-full text-sm"
                        value={b.props.address}
                        onChange={(e) =>
                          updateBlock(b.id, { address: e.target.value })
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        {/* --- Правая панель: Кастомизация --- */}
        <aside className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold mb-2">Кастомизация блока</h3>
            {!selectedBlock ? (
              <p className="text-xs text-gray-500">
                Выберите блок для редактирования
              </p>
            ) : (
              <>
                {selectedBlock.type === 'text' && (
                  <>
                    <label className="block text-sm mb-1">Текст</label>
                    <input
                      className="w-full mb-2"
                      value={selectedBlock.props.text}
                      onChange={(e) =>
                        updateBlock(selectedBlock.id, { text: e.target.value })
                      }
                    />
                    <label className="block text-sm">Цвет текста</label>
                    <input
                      type="color"
                      className="w-full"
                      value={selectedBlock.props.color}
                      onChange={(e) =>
                        updateBlock(selectedBlock.id, { color: e.target.value })
                      }
                    />
                    <label className="block text-sm">Цвет фона</label>
                    <input
                      type="color"
                      className="w-full"
                      value={selectedBlock.props.bg}
                      onChange={(e) =>
                        updateBlock(selectedBlock.id, { bg: e.target.value })
                      }
                    />
                    <label className="block text-sm">Шрифт</label>
                    <select
                      className="w-full mt-1 border rounded p-1"
                      value={selectedBlock.props.font}
                      onChange={(e) =>
                        updateBlock(selectedBlock.id, { font: e.target.value })
                      }
                    >
                      <option value="sans-serif">Sans</option>
                      <option value="serif">Serif</option>
                      <option value="monospace">Mono</option>
                    </select>
                  </>
                )}
                {selectedBlock.type === 'button' && (
                  <>
                    <label className="block text-sm mb-1">Текст кнопки</label>
                    <input
                      className="w-full mb-2"
                      value={selectedBlock.props.text}
                      onChange={(e) =>
                        updateBlock(selectedBlock.id, { text: e.target.value })
                      }
                    />
                    <label className="block text-sm">Цвет текста</label>
                    <input
                      type="color"
                      className="w-full"
                      value={selectedBlock.props.color}
                      onChange={(e) =>
                        updateBlock(selectedBlock.id, { color: e.target.value })
                      }
                    />
                    <label className="block text-sm">Цвет кнопки</label>
                    <input
                      type="color"
                      className="w-full"
                      value={selectedBlock.props.bg}
                      onChange={(e) =>
                        updateBlock(selectedBlock.id, { bg: e.target.value })
                      }
                    />
                  </>
                )}
                {/* Можно расширять для других типов */}
              </>
            )}
          </div>
        </aside>
      </div>
    </StandardPageLayout>
  );
};

export default EditorPage;
