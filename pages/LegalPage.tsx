import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import StandardPageLayout from "../layouts/StandardPageLayout";

// --- Секции Legal (можно вынести в отдельные md/json для интернационализации) ---
const SECTIONS = [
  { id: "terms", title: "Пользовательское соглашение (Terms of Service)" },
  { id: "privacy", title: "Политика конфиденциальности (Privacy Policy)" },
  { id: "cookies", title: "Политика cookies (Cookies Policy)" },
  { id: "gdpr", title: "GDPR & Права пользователя" },
  { id: "contacts", title: "Контакты и реквизиты" },
  { id: "history", title: "Версии и история изменений" },
];

const SECTION_CONTENT: Record<string, React.ReactNode> = {
  terms: (
    <>
      <h2>Пользовательское соглашение (Terms of Service)</h2>
      <p>
        Используя платформу Basis, вы соглашаетесь с условиями данного
        соглашения. Не соглашаетесь — не пользуетесь.
      </p>
      <ul className="list-disc ml-6">
        <li>Не публикуйте запрещённый контент, спам, вредоносное ПО.</li>
        <li>Платформа не отвечает за сбои третьих сервисов.</li>
        <li>
          Все созданные страницы принадлежат вам, но лицензия — невозвратимая и
          неисключительная.
        </li>
        <li>
          Мы имеем право обновлять продукт и менять условия, уведомляя об этом в
          личном кабинете и/или по email.
        </li>
        <li>
          Поддержка предоставляется “как есть”, но мы стараемся реагировать
          быстро.
        </li>
        <li>Для коммерческого использования необходим отдельный договор.</li>
      </ul>
      <p className="text-xs text-gray-400 mt-3">Последнее обновление: 7 июня 2025</p>
    </>
  ),
  privacy: (
    <>
      <h2>Политика конфиденциальности (Privacy Policy)</h2>
      <ul className="list-disc ml-6">
        <li>
          Мы собираем только минимально необходимые данные (имя, email, историю
          входов, настройки страницы).
        </li>
        <li>
          Cookies используются для авторизации, аналитики и UX (Google
          Analytics, Yandex Metrica).
        </li>
        <li>
          Данные не передаются третьим лицам без вашего согласия, кроме случаев,
          предусмотренных законом.
        </li>
        <li>
          Хранение данных — на серверах в ЕС (или РФ), с применением стандартов
          безопасности (GDPR compliant).
        </li>
        <li>
          По запросу вы можете получить экспорт всех ваших данных или удалить их
          полностью (см. секцию GDPR).
        </li>
      </ul>
      <p className="text-xs text-gray-400 mt-3">Последнее обновление: 7 июня 2025</p>
    </>
  ),
  cookies: (
    <>
      <h2>Политика cookies (Cookies Policy)</h2>
      <ul className="list-disc ml-6">
        <li>
          Мы используем cookies только для работы платформы и аналитики, не для
          продажи или передачи данных третьим лицам.
        </li>
        <li>
          Любой пользователь может очистить cookies через настройки браузера.
        </li>
        <li>
          Подробная информация: <a href="/legal/cookies-detail" className="text-indigo-600 underline">здесь</a>
        </li>
      </ul>
    </>
  ),
  gdpr: (
    <>
      <h2>GDPR & Права пользователя</h2>
      <ul className="list-disc ml-6">
        <li>Вы можете запросить экспорт всех ваших данных (портал “Аккаунт”).</li>
        <li>Вы вправе полностью удалить аккаунт и все связанные данные.</li>
        <li>
          Для жалоб/запросов — пишите на privacy@basis.dev, ответим в течение 72
          часов.
        </li>
        <li>
          При удалении аккаунта данные хранятся в backup до 90 дней, затем
          полностью уничтожаются.
        </li>
        <li>
          Контролёр данных: ООО “Rara Avis”, ОГРН 1234567890000, ИНН 7700000000.
        </li>
      </ul>
    </>
  ),
  contacts: (
    <>
      <h2>Контакты и реквизиты</h2>
      <ul className="list-disc ml-6">
        <li>Юридическое лицо: ООО “Rara Avis Group”</li>
        <li>ИНН: 7700000000</li>
        <li>ОГРН: 1234567890000</li>
        <li>Адрес: Москва, ул. Примерная, д. 1</li>
        <li>
          Email для запросов: <a href="mailto:support@basis.dev" className="text-indigo-600 underline">support@basis.dev</a>
        </li>
        <li>
          Для GDPR & privacy: <a href="mailto:privacy@basis.dev" className="text-indigo-600 underline">privacy@basis.dev</a>
        </li>
        <li>Телефон: +7 495 000 00 00</li>
      </ul>
    </>
  ),
  history: (
    <>
      <h2>Версии и история изменений</h2>
      <ul className="list-disc ml-6">
        <li>07.06.2025 — Обновление структуры документов, добавлен GDPR-блок.</li>
        <li>01.05.2025 — Актуализированы контакты, интеграция cookies-политики.</li>
        <li>12.04.2025 — Первая публикация.</li>
      </ul>
    </>
  ),
};

const LegalPage: React.FC = () => {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [search, setSearch] = useState("");

  // Фильтрация по поиску
  const filteredSections = SECTIONS.filter((s) => {
    if (s.title.toLowerCase().includes(search.toLowerCase())) return true;
    const content = SECTION_CONTENT[s.id];
    if (React.isValidElement(content)) {
      const text = content.props.children?.toString().toLowerCase() || '';
      return text.includes(search.toLowerCase());
    }
    return false;
  });

  return (
    <StandardPageLayout title="Правовые документы и политика платформы Basis">
      <Helmet>
        <meta
          name="description"
          content="Условия использования, политика конфиденциальности, GDPR и контакты платформы Basis."
        />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Basis",
            "url": "https://basis.dev/legal",
            "email": "support@basis.dev",
            "areaServed": "RU, EU"
          }
        `}</script>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-8 min-h-[70vh] py-8">
        {/* Sticky меню оглавления */}
        <nav className="md:w-1/4 sticky top-32 self-start">
          <div className="mb-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Поиск по документам…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Поиск по legal-документам"
            />
          </div>
          <ul className="space-y-1 text-sm">
            {filteredSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block px-3 py-2 rounded ${
                    active === section.id
                      ? "bg-indigo-100 text-indigo-800 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActive(section.id)}
                  aria-current={active === section.id ? "page" : undefined}
                >
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => window.print()}
                className="w-full px-3 py-2 mt-3 text-left text-indigo-600 hover:underline"
              >
                Распечатать/Скачать PDF
              </button>
            </li>
          </ul>
        </nav>
        {/* Контент секции */}
        <main className="md:w-3/4 space-y-12">
          {filteredSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white p-6 rounded-xl shadow border"
              tabIndex={-1}
              aria-labelledby={`${section.id}-title`}
            >
              <div id={`${section.id}-title`} className="text-xl font-bold mb-2">
                {section.title}
              </div>
              {SECTION_CONTENT[section.id]}
            </section>
          ))}
        </main>
      </div>
    </StandardPageLayout>
  );
};

export default LegalPage;

