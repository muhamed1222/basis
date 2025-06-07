# Run and deploy your AI Studio app

Это минимальный шаблон приложения на React/Vite. Ниже приведена информация о запуске и краткое описание структуры.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
4. Запустите API сервер:
   `npm run server`

## Структура проекта

```
components/      // переиспользуемые элементы и контейнеры
hooks/           // общие React hooks
services/        // запросы к внешним API
contexts/        // React контексты
ui/              // простые UI-компоненты (кнопки и т.д.)
pages/           // страницы приложения
layouts/         // компоненты раскладки
routes/          // конфигурация маршрутов
```


## API сервер

В каталоге `server/` расположен простой сервер на Express с поддержкой OAuth2, GraphQL и документацией Swagger. Запуск сервера:

```
npm run server
```

REST‑эндпоинт `/api/profile` и GraphQL‑точка `/graphql` предоставляют базовый доступ к профилю пользователя. Токен можно получить через `/oauth/token`. Пример документации доступен на `/docs` после запуска сервера.

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

