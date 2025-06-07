import React from 'react';
import { StandardPageLayout } from '../App'; 
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <StandardPageLayout title="1. Home (Landing Page)">
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold font-pragmatica mb-3">Краткое описание платформы</h2>
          <p className="text-lg text-gray-700">
            Basis - это инновационная платформа для создания потрясающих персональных страниц и портфолио с использованием интуитивно понятного bento-grid конструктора. 
            Покажите миру свои проекты стильно и эффективно! Создавайте уникальные страницы, которые отражают вашу индивидуальность и профессионализм.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold font-pragmatica mb-3">Кейсы/примеры страниц пользователей</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example User Page Card */}
            <div className="border rounded-lg p-4 shadow-lg bg-gray-50 hover:shadow-xl transition-shadow">
              <div className="w-full h-40 bg-gray-300 rounded-md mb-3 flex items-center justify-center">
                <span className="text-gray-500">Пример страницы 1</span>
              </div>
              <h3 className="text-lg font-medium mb-1 font-pragmatica">Дизайнерское Портфолио</h3>
              <p className="text-sm text-gray-600 mb-2">Яркий пример использования bento grid для демонстрации визуальных проектов.</p>
              <Link to="/public-profile" className="text-blue-600 hover:text-blue-800 text-sm">Посмотреть &rarr;</Link>
            </div>
            {/* Another Example User Page Card */}
            <div className="border rounded-lg p-4 shadow-lg bg-gray-50 hover:shadow-xl transition-shadow">
              <div className="w-full h-40 bg-gray-300 rounded-md mb-3 flex items-center justify-center">
                <span className="text-gray-500">Пример страницы 2</span>
              </div>
              <h3 className="text-lg font-medium mb-1 font-pragmatica">Профиль Разработчика</h3>
              <p className="text-sm text-gray-600 mb-2">Техническое портфолио с интеграциями и ссылками на GitHub.</p>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm pointer-events-none opacity-50">Скоро &rarr;</a>
            </div>
             <div className="border rounded-lg p-4 shadow-lg bg-gray-50 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-medium mb-1 font-pragmatica">Ваша страница здесь?</h3>
              <p className="text-sm text-gray-600 mb-2">Создайте свою уникальную страницу и поделитесь ею с миром!</p>
              <Link to="/auth?action=signup" className="text-green-600 hover:text-green-800 text-sm">Создать страницу &rarr;</Link>
            </div>
          </div>
        </section>
        
        <section className="text-center py-8 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold font-pragmatica mb-4">Готовы начать?</h2>
          <div className="flex justify-center space-x-4">
            <Link to="/auth?action=signup" className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors text-lg">
              Попробовать бесплатно
            </Link>
            <Link to="/auth?action=login" className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors text-lg">
              Войти
            </Link>
          </div>
        </section>
        
        <footer className="mt-12 pt-8 border-t border-gray-300">
          <h2 className="text-xl font-semibold font-pragmatica mb-4">Basis Platform</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">О компании</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/legal#terms" className="hover:underline">Наша миссия</Link></li>
                <li><Link to="/legal#privacy" className="hover:underline">Команда</Link></li>
                <li><Link to="#" className="hover:underline pointer-events-none opacity-50">Карьера</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Поддержка</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/support#faq" className="hover:underline">FAQ</Link></li>
                <li><Link to="/support#contact" className="hover:underline">Контакты</Link></li>
                <li><Link to="/support#guides" className="hover:underline">Руководства</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Юридическая информация</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/legal#terms" className="hover:underline">Условия использования</Link></li>
                <li><Link to="/legal#privacy" className="hover:underline">Политика конфиденциальности</Link></li>
                <li><Link to="/legal#cookies" className="hover:underline">Политика Cookie</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Basis Platform. Все права защищены.</p>
            {/* Placeholder for social media icons */}
            <div className="mt-2 space-x-3">
              <a href="#" className="hover:text-gray-700">Facebook</a>
              <a href="#" className="hover:text-gray-700">Twitter</a>
              <a href="#" className="hover:text-gray-700">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </StandardPageLayout>
  );
};

export default HomePage;