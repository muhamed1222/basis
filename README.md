# Run and deploy your AI Studio app

Это минимальный шаблон приложения на React/Vite. Ниже приведена информация о запуске и краткое описание структуры.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Структура проекта

```
components/      // переиспользуемые элементы и контейнеры
hooks/           // общие React hooks
services/        // запросы к внешним API
ui/              // простые UI-компоненты (кнопки и т.д.)
pages/           // страницы приложения
```

Компоненты оборачиваются в `ErrorBoundary` в `index.tsx` для глобальной обработки ошибок.

## Запуск тестов

После установки зависимостей можно запустить простые тесты командой:

`npm test`

Для режима наблюдения используйте:

`npm run test:watch`

## Линтинг и форматирование

В проекте настроены ESLint и Prettier. Запуск проверки:

```
npx eslint .
```

Форматирование файлов:

```
npx prettier -w .
```

## AI Demo

На странице `/ai` доступен простой пример использования AI для генерации контента профиля. Введите цели и описание, нажмите **Сгенерировать**, и модуль покажет пример результата.
