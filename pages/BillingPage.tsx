import React from 'react';
import { StandardPageLayout } from '../App';
import { Link } from 'react-router-dom';

const TariffCard: React.FC<{
  name: string;
  price: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
}> = ({ name, price, features, current, popular }) => (
  <div
    className={`border rounded-lg p-6 shadow-sm relative ${current ? 'border-indigo-500 ring-2 ring-indigo-500' : 'bg-white'} ${popular ? 'border-green-500' : ''}`}
  >
    {popular && !current && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
        Популярный
      </div>
    )}
    {current && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
        Текущий тариф
      </div>
    )}
    <h3 className="text-xl font-semibold font-pragmatica text-gray-800 mb-2">
      {name}
    </h3>
    <p className="text-3xl font-bold text-gray-900 mb-4">
      {price}
      <span className="text-sm font-normal text-gray-500">/месяц</span>
    </p>
    <ul className="space-y-2 text-sm text-gray-600 mb-6">
      {features.map((feature) => (
        <li key={feature} className="flex items-center">
          <svg
            className="w-4 h-4 text-green-500 mr-2 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    {current ? (
      <button
        disabled
        className="w-full px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
      >
        Ваш текущий тариф
      </button>
    ) : (
      <button
        className={`w-full px-6 py-3 ${popular ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold rounded-lg transition-colors`}
      >
        Переключиться на {name}
      </button>
    )}
  </div>
);

const PaymentHistoryRow: React.FC<{
  date: string;
  amount: string;
  status: string;
  invoiceId: string;
}> = ({ date, amount, status, invoiceId }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 text-sm">
    <td className="py-3 px-4 text-gray-700">{date}</td>
    <td className="py-3 px-4 text-gray-700">{amount}</td>
    <td className="py-3 px-4">
      <span
        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${status === 'Оплачено' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
      >
        {status}
      </span>
    </td>
    <td className="py-3 px-4">
      <a href="#" className="text-indigo-600 hover:underline">
        #{invoiceId}
      </a>
    </td>
  </tr>
);

const BillingPage: React.FC = () => {
  return (
    <StandardPageLayout title="7. Billing & Tariffs">
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold font-pragmatica mb-4">
            Тарифные планы
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TariffCard
              name="Free"
              price="0₽"
              features={['1 страница', 'Базовые блоки', 'Поддержка Basis']}
            />
            <TariffCard
              name="Pro"
              price="499₽"
              features={[
                '10 страниц',
                'Все блоки',
                'Кастомный домен',
                'Аналитика',
                'Приоритетная поддержка',
              ]}
              current
              popular
            />
            <TariffCard
              name="Business"
              price="1499₽"
              features={[
                'Безлимит страниц',
                'Командный доступ',
                'API доступ',
                'Персональный менеджер',
              ]}
            />
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold font-pragmatica text-gray-800 mb-4">
            Настройки оплаты
          </h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-700">Способ оплаты</h4>
              <p className="text-sm text-gray-600">
                Карта Visa **** **** **** 1234 (действительна до 12/25)
              </p>
              <button className="text-sm text-indigo-600 hover:underline mt-1">
                Изменить способ оплаты
              </button>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">
                Автопродление подписки
              </h4>
              <div className="flex items-center mt-1">
                <input
                  type="checkbox"
                  id="auto_renew"
                  defaultChecked
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="auto_renew"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Автоматически продлевать подписку Pro каждый месяц
                </label>
              </div>
            </div>
            <Link
              to="/account"
              className="text-sm text-gray-500 hover:underline"
            >
              Управлять подпиской в настройках аккаунта
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold font-pragmatica mb-4">
            История платежей
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Инвойс
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <PaymentHistoryRow
                  date="01.08.2024"
                  amount="499₽"
                  status="Оплачено"
                  invoiceId="INV-2024-001"
                />
                <PaymentHistoryRow
                  date="01.07.2024"
                  amount="499₽"
                  status="Оплачено"
                  invoiceId="INV-2024-002"
                />
                <PaymentHistoryRow
                  date="01.06.2024"
                  amount="499₽"
                  status="Оплачено"
                  invoiceId="INV-2024-003"
                />
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Отображены последние 3 платежа.{' '}
            <a href="#" className="text-indigo-600 hover:underline">
              Посмотреть всю историю
            </a>
            .
          </p>
        </section>
      </div>
    </StandardPageLayout>
  );
};

export default BillingPage;
