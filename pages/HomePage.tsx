import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StandardPageLayout from "../layouts/StandardPageLayout";
import { Skeleton } from "../components/Skeleton";
import {
  fetchCases,
  fetchStats,
  fetchReviews,
  type HomeCase,
  type HomeStats,
  type HomeReview,
} from "../api/home";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<HomeCase[]>([]);
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [reviews, setReviews] = useState<HomeReview[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchCases().catch(() => []),
      fetchStats().catch(() => null),
      fetchReviews().catch(() => []),
    ]).then(([cases, stats, reviews]) => {
      setCases(cases);
      setStats(stats);
      setReviews(reviews);
      setLoading(false);
    });
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => setEmail(""), 200);
  };

  return (
    <StandardPageLayout title="Basis — твоя цифровая визитка нового поколения">
      <main className="space-y-14">
        <section className="py-16 flex flex-col items-center text-center bg-gradient-to-b from-gray-50 via-white to-white rounded-xl">
          <h1 className="text-4xl font-black mb-4">
            Basis — твой умный бенто‑конструктор для цифровых страниц
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-xl">
            Создай портфолио или мульти‑линк быстрее, чем за 2 минуты.<br />
            Никакой рутины, всё — drag&drop. Покажи миру себя по‑новому.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/auth?action=signup"
              className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 text-lg"
            >
              Попробовать бесплатно
            </Link>
            <Link
              to="/auth?action=login"
              className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-xl shadow-md hover:bg-gray-900 text-lg"
            >
              Войти
            </Link>
          </div>
          {!subscribed && (
            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col sm:flex-row items-center gap-2"
              aria-label="Форма подписки на обновления"
            >
              <input
                type="email"
                placeholder="Введите свой email"
                className="p-3 border rounded-md min-w-[240px] shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-5 py-3 bg-indigo-600 text-white rounded-md font-semibold shadow hover:bg-indigo-700"
              >
                Получить гайд “10 ошибок портфолио”
              </button>
            </form>
          )}
          {subscribed && (
            <div className="mt-6 text-green-600 font-semibold">
              Спасибо! Ссылка на гайд отправлена на почту.
            </div>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
            {stats ? (
              <>
                <div>
                  <div className="text-2xl font-bold">{stats.users}+</div>
                  <div className="text-sm text-gray-500">Пользователей</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.pages}+</div>
                  <div className="text-sm text-gray-500">Страниц создано</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.integrations}</div>
                  <div className="text-sm text-gray-500">Интеграций</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-sm text-gray-500">Оценка пользователей</div>
                </div>
              </>
            ) : (
              <Skeleton className="h-8 w-60" />
            )}
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Как работает Basis?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3 text-2xl">1</div>
              <div className="font-semibold mb-1">Создай страницу</div>
              <div className="text-gray-500 text-sm">Выбери шаблон или начни с нуля — drag&drop любой блок</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3 text-2xl">2</div>
              <div className="font-semibold mb-1">Кастомизируй</div>
              <div className="text-gray-500 text-sm">Меняй цвета, шрифты, интегрируй соцсети и сервисы без кода</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3 text-2xl">3</div>
              <div className="font-semibold mb-1">Публикуй за секунду</div>
              <div className="text-gray-500 text-sm">Поделись ссылкой или подключи собственный домен</div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Демонстрация редактора Basis"
              frameBorder={0}
              className="rounded-xl shadow-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Примеры страниц пользователей</h2>
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
          ) : cases.length === 0 ? (
            <div className="text-gray-500 text-center">Нет кейсов — стань первым!</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {cases.slice(0, 3).map((c) => (
                <div key={c.id} className="border rounded-xl p-4 shadow-lg bg-white hover:shadow-2xl transition-shadow">
                  <img
                    src={c.preview}
                    alt={`Превью страницы ${c.title}`}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{c.desc}</p>
                  <Link to={`/profile/${c.username}`} className="text-indigo-600 hover:underline text-sm">
                    Посмотреть &rarr;
                  </Link>
                </div>
              ))}
            </div>
          )}
          {cases.length > 3 && (
            <div className="mt-6 flex justify-center">
              <Link to="/cases" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold">
                Больше примеров
              </Link>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Отзывы пользователей</h2>
          {loading ? (
            <Skeleton className="h-20 w-full" />
          ) : reviews.length === 0 ? (
            <div className="text-gray-500 text-center">Пока нет отзывов.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 bg-gray-50 rounded-lg shadow flex flex-col">
                  <div className="flex items-center mb-2 gap-2">
                    <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.job}</div>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm mb-2">{r.text}</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < r.stars ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="py-10 bg-green-50 rounded-xl text-center mt-10">
          <h2 className="text-2xl font-bold mb-3">Присоединяйся — стань автором своей страницы</h2>
          <Link
            to="/auth?action=signup"
            className="inline-block px-10 py-4 bg-green-500 text-white rounded-xl font-semibold shadow-lg hover:bg-green-600 text-xl"
          >
            Начать бесплатно
          </Link>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-300">
          <div className="grid md:grid-cols-3 gap-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">О компании</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/about" className="hover:underline">
                    О Basis
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="hover:underline">
                    Команда
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:underline">
                    Карьера
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Поддержка</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/support#faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/support#contact" className="hover:underline">
                    Контакты
                  </Link>
                </li>
                <li>
                  <Link to="/support#guides" className="hover:underline">
                    Руководства
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Юридическая информация</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/legal#terms" className="hover:underline">
                    Условия использования
                  </Link>
                </li>
                <li>
                  <Link to="/legal#privacy" className="hover:underline">
                    Политика конфиденциальности
                  </Link>
                </li>
                <li>
                  <Link to="/legal#cookies" className="hover:underline">
                    Политика Cookie
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center text-sm text-gray-500 gap-2">
            <p>
              &copy; {new Date().getFullYear()} Basis Platform. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-gray-700">Twitter</a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-gray-700">LinkedIn</a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:text-gray-700">Telegram</a>
            </div>
            <div className="text-xs text-gray-400 mt-1">Сделано с ♥ в Rara Avis</div>
          </div>
        </footer>
      </main>
    </StandardPageLayout>
  );
};

export default HomePage;
