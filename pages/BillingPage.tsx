import React, { useEffect, useState } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import {
  getTariffs,
  getBillingInfo,
  switchTariff,
  updatePaymentMethod,
  toggleAutoRenew,
  getPaymentHistory,
  Tariff,
  BillingInfo,
  PaymentHistoryItem,
} from '../api/billing';
import { Link } from 'react-router-dom';
import useNotification from '../hooks/useNotification';

const TariffCard = ({
  name,
  price,
  features,
  current,
  popular,
  onSwitch,
  loading,
}: {
  name: string;
  price: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
  onSwitch?: () => void;
  loading?: boolean;
}) => (
  <div
    className={`border rounded-lg p-6 shadow-sm relative ${current ? 'border-indigo-500 ring-2 ring-indigo-500' : 'bg-white'} ${popular ? 'border-green-500' : ''}`}
    aria-current={current ? 'true' : 'false'}
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
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
    <p className="text-3xl font-bold text-gray-900 mb-4">
      {price}
      <span className="text-sm font-normal text-gray-500">/месяц</span>
    </p>
    <ul className="space-y-2 text-sm text-gray-600 mb-6">
      {features.map((feature) => (
        <li key={feature} className="flex items-center">
          <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
        aria-label="Ваш текущий тариф"
      >
        Ваш текущий тариф
      </button>
    ) : (
      <button
        onClick={onSwitch}
        disabled={loading}
        className={`w-full px-6 py-3 ${popular ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold rounded-lg transition-colors`}
        aria-label={`Переключиться на тариф ${name}`}
      >
        {loading ? 'Переключаем...' : `Переключиться на ${name}`}
      </button>
    )}
  </div>
);

const PaymentHistoryRow = ({
  date,
  amount,
  status,
  invoiceId,
  link,
}: PaymentHistoryItem) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 text-sm">
    <td className="py-3 px-4 text-gray-700">{date}</td>
    <td className="py-3 px-4 text-gray-700">{amount}</td>
    <td className="py-3 px-4">
      <span
        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
          status === 'Оплачено'
            ? 'bg-green-100 text-green-700'
            : status === 'Отклонено'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {status}
      </span>
    </td>
    <td className="py-3 px-4">
      {link ? (
        <a href={link} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
          #{invoiceId}
        </a>
      ) : (
        <span className="text-gray-400">—</span>
      )}
    </td>
  </tr>
);

const BillingPage: React.FC = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tariffLoading, setTariffLoading] = useState<string | null>(null);
  const [autoRenew, setAutoRenew] = useState(false);
  const [payMethodLoading, setPayMethodLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [t, b, h] = await Promise.all([
          getTariffs(),
          getBillingInfo(),
          getPaymentHistory(),
        ]);
        setTariffs(t);
        setBillingInfo(b);
        setHistory(h);
        setAutoRenew(!!b?.autoRenew);
      } catch {
        showNotification('Ошибка загрузки биллинга', 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, [showNotification]);

  const handleSwitchTariff = async (tariffId: string) => {
    setTariffLoading(tariffId);
    try {
      await switchTariff(tariffId);
      showNotification('Тариф успешно переключён!', 'success');
      const b = await getBillingInfo();
      setBillingInfo(b);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Ошибка переключения тарифа';
      showNotification(message, 'error');
    } finally {
      setTariffLoading(null);
    }
  };

  const handleUpdatePayMethod = async () => {
    setPayMethodLoading(true);
    try {
      await updatePaymentMethod();
      showNotification('Способ оплаты обновлён', 'success');
      const b = await getBillingInfo();
      setBillingInfo(b);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Ошибка обновления оплаты';
      showNotification(message, 'error');
    } finally {
      setPayMethodLoading(false);
    }
  };

  const handleToggleAutoRenew = async () => {
    setAutoRenew((prev) => !prev);
    try {
      await toggleAutoRenew(!autoRenew);
      showNotification(`Автопродление ${!autoRenew ? 'включено' : 'отключено'}`, 'success');
    } catch (e: unknown) {
      setAutoRenew((prev) => !prev);
      const message = e instanceof Error ? e.message : 'Ошибка смены автопродления';
      showNotification(message, 'error');
    }
  };

  if (loading) {
    return (
      <StandardPageLayout title="Биллинг">
        <div className="flex items-center justify-center py-16">
          <span className="text-lg text-gray-500">Загрузка...</span>
        </div>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title="Биллинг и тарифы">
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Тарифные планы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tariffs.map((t) => (
              <TariffCard
                key={t.id}
                name={t.name}
                price={t.price}
                features={t.features}
                current={billingInfo?.tariff?.id === t.id}
                popular={t.popular}
                onSwitch={() => handleSwitchTariff(t.id)}
                loading={tariffLoading === t.id}
              />
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Настройки оплаты</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-700">Способ оплаты</h4>
              <p className="text-sm text-gray-600">
                {billingInfo?.paymentMethod || 'Не задан'}
              </p>
              <button
                className="text-sm text-indigo-600 hover:underline mt-1"
                disabled={payMethodLoading}
                onClick={handleUpdatePayMethod}
                aria-busy={payMethodLoading}
              >
                {payMethodLoading ? 'Обновляем...' : 'Изменить способ оплаты'}
              </button>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Автопродление подписки</h4>
              <div className="flex items-center mt-1">
                <input
                  type="checkbox"
                  id="auto_renew"
                  checked={autoRenew}
                  onChange={handleToggleAutoRenew}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  aria-checked={autoRenew}
                />
                <label htmlFor="auto_renew" className="ml-2 block text-sm text-gray-700">
                  Автоматически продлевать подписку каждый месяц
                </label>
              </div>
            </div>
            <Link to="/account" className="text-sm text-gray-500 hover:underline">
              Управлять подпиской в настройках аккаунта
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">История платежей</h2>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Инвойс</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-400">Нет данных о платежах</td>
                  </tr>
                ) : (
                  history.map((p) => <PaymentHistoryRow key={p.invoiceId} {...p} />)
                )}
              </tbody>
            </table>
          </div>
          {history.length > 3 && (
            <p className="text-sm text-gray-500 mt-4">
              Показаны последние 3 платежа.{" "}
              <Link to="/billing/history" className="text-indigo-600 hover:underline">
                Посмотреть всю историю
              </Link>
              .
            </p>
          )}
        </section>
      </div>
    </StandardPageLayout>
  );
};

export default BillingPage;
