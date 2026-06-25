import { useEffect } from 'react';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { fetchAnalytics } from '../../../shared/store/slices/dashboardSlice';
import { selectDashboardCards, selectDashboardCharts } from '../../../shared/store/selectors/dashboardSelectors';

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.dashboard);
  const cards = useAppSelector(selectDashboardCards);
  const charts = useAppSelector(selectDashboardCharts);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>

        {isLoading && <p className="text-gray-600">Loading analytics...</p>}
        {error && (
          <div className="p-3 rounded bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-lg border p-4">
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold mb-3">Books by Format</h2>
            <ul className="space-y-2">
              {charts.formats.map((item) => (
                <li key={item.label} className="flex justify-between">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold mb-3">Books by Status</h2>
            <ul className="space-y-2">
              {charts.statuses.map((item) => (
                <li key={item.label} className="flex justify-between">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}