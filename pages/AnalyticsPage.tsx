import React from 'react';
import { StandardPageLayout } from '../App';

const StatCard: React.FC<{
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}> = ({ title, value, change, changeType }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
      {title}
    </h4>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    {change && (
      <p
        className={`text-xs mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}
      >
        {changeType === 'positive' ? '↑' : '↓'} {change} с прошлого периода
      </p>
    )}
  </div>
);

const ChartPlaceholder: React.FC<{ title: string; height?: string }> = ({
  title,
  height = 'h-64',
}) => (
  <div
    className={`bg-white border border-gray-200 rounded-lg shadow-sm p-6 ${height} flex flex-col`}
  >
    <h4 className="text-md font-semibold text-gray-700 font-pragmatica mb-2">
      {title}
    </h4>
    <div className="flex-grow bg-gray-100 rounded flex items-center justify-center">
      <p className="text-gray-400 text-sm">(Placeholder for {title} Chart)</p>
    </div>
  </div>
);

const AnalyticsPage: React.FC = () => {
  return (
    <StandardPageLayout title="8. Analytics">
      <div className="space-y-8">
        {/* Date Range Picker Placeholder */}
        <div className="flex justify-end items-center space-x-2 mb-6">
          <span className="text-sm text-gray-600">Период:</span>
          <input
            type="date"
            defaultValue="2024-07-01"
            className="p-1.5 border border-gray-300 rounded-md text-sm"
          />
          <span className="text-sm text-gray-600">-</span>
          <input
            type="date"
            defaultValue="2024-07-31"
            className="p-1.5 border border-gray-300 rounded-md text-sm"
          />
          <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
            Применить
          </button>
        </div>

        {/* Overview Stats */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Всего просмотров"
            value="12,345"
            change="15.2%"
            changeType="positive"
          />
          <StatCard
            title="Уникальные посетители"
            value="8,765"
            change="10.1%"
            changeType="positive"
          />
          <StatCard
            title="Всего кликов (CTA)"
            value="1,230"
            change="5.8%"
            changeType="positive"
          />
          <StatCard
            title="Коэффициент конверсии"
            value="7.5%"
            change="0.5%"
            changeType="negative"
          />
        </section>

        {/* Charts Section */}
        <section className="grid lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Просмотры страниц по дням" />
          <ChartPlaceholder title="География посетителей" />
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Источники трафика" height="h-48" />
          <ChartPlaceholder title="Популярные устройства" height="h-48" />
        </section>

        {/* Conversion Data Section */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold font-pragmatica text-gray-800 mb-4">
            Конверсии по формам и CTA
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3 text-left font-medium text-gray-500">
                    Элемент
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500">
                    Показы
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500">
                    Клики/Отправки
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500">
                    Конверсия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 px-3">Форма "Обратная связь"</td>
                  <td className="py-2 px-3">500</td>
                  <td className="py-2 px-3">25</td>
                  <td className="py-2 px-3">5.0%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Кнопка "Подписаться"</td>
                  <td className="py-2 px-3">2,300</td>
                  <td className="py-2 px-3">150</td>
                  <td className="py-2 px-3">6.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Export Data */}
        <section className="text-right">
          <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
            Экспорт данных (CSV)
          </button>
        </section>
      </div>
    </StandardPageLayout>
  );
};

export default AnalyticsPage;
