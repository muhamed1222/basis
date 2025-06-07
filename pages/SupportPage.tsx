import React from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Link } from 'react-router-dom';

const SupportPage: React.FC = () => {
  const faqItems = [
    {
      q: 'Как создать свою первую страницу?',
      a: "Перейдите в Дашборд и нажмите кнопку 'Создать новую страницу'...",
    },
    {
      q: 'Можно ли подключить свой домен?',
      a: 'Да, на тарифе Pro и выше вы можете подключить собственный домен.',
    },
    {
      q: 'Как изменить тему оформления?',
      a: "В редакторе страницы, в панели 'Кастомизация', вы найдете опции для смены тем.",
    },
  ];

  return (
    <StandardPageLayout title="9. Support & Help Center">
      <div className="space-y-10">
        <section className="text-center">
          <h2 className="text-2xl font-semibold font-pragmatica mb-3">
            Чем мы можем помочь?
          </h2>
          <input
            type="search"
            placeholder="Поиск по базе знаний..."
            className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </section>

        <section>
          <h3 className="text-xl font-semibold font-pragmatica mb-4">
            FAQ (Часто задаваемые вопросы)
          </h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 group"
              >
                <summary className="font-medium text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-indigo-500 group-open:rotate-180 transition-transform duration-200">
                    &#9660;
                  </span>
                </summary>
                <p className="text-gray-600 mt-2 text-sm">{item.a}</p>
              </details>
            ))}
          </div>
          <Link
            to="/support/all-faq"
            className="text-indigo-600 hover:underline mt-4 inline-block text-sm"
          >
            Посмотреть все FAQ
          </Link>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold font-pragmatica mb-3">
              Связаться с поддержкой
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Не нашли ответ? Наша команда поддержки готова помочь.
            </p>
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                Начать Live-чат
              </button>
              <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Создать тикет в поддержку
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Время ответа: Обычно в течение 24 часов.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold font-pragmatica mb-3">
              Руководства и Документация
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/docs/user-guide"
                  className="text-indigo-600 hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v11.494m0 0A7.5 7.5 0 0019.5 12H4.5A7.5 7.5 0 0012 17.747z"
                    ></path>
                  </svg>
                  Руководство пользователя
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/api"
                  className="text-indigo-600 hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                  </svg>
                  Документация API
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/tutorials"
                  className="text-indigo-600 hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Видеоуроки
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/block-types"
                  className="text-indigo-600 hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                  Описание типов блоков
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </StandardPageLayout>
  );
};

export default SupportPage;
