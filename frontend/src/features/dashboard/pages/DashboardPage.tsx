import { useEffect } from 'react';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { fetchAnalytics } from '../../../shared/store/slices/dashboardSlice';
import { selectDashboardCards, selectDashboardCharts } from '../../../shared/store/selectors/dashboardSelectors';
import { DonutChart } from '../charts/DonutChart';
import { ClusteredBarChart } from '../charts/ClusteredBarChart';
import { HistogramChart } from '../charts/HistogramChart';
import {
  selectImpactKpis,
  selectCategoryDonut,
  selectFormatVsStock,
  selectFormatSeriesOrder,
  selectWorksByAgeBins,
} from '../../../shared/store/selectors/dashboardViewSelectors';

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.dashboard);
  const cards = useAppSelector(selectDashboardCards);
  const charts = useAppSelector(selectDashboardCharts);
  const kpis = useAppSelector(selectImpactKpis);
  const categoryDonut = useAppSelector(selectCategoryDonut);
  const formatVsStock = useAppSelector(selectFormatVsStock);
  const formatSeriesOrder = useAppSelector(selectFormatSeriesOrder);
  const worksByAgeBins = useAppSelector(selectWorksByAgeBins);

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
            <p className="text-sm text-gray-500">Total Financial Value of Inventory</p>
            <p className="text-2xl font-bold">${kpis.inventoryValue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-500">Stock Alert Index</p>
            <p className="text-2xl font-bold">{kpis.stockAlertIndex.toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border p-2">
            <DonutChart title="Catalog Distribution by Category" data={categoryDonut} />
          </div>
          <div className="bg-white rounded-lg border p-2">
            <ClusteredBarChart
               title="Formato vs Stock actual (Papel vs Digital)"
              data={formatVsStock}
              seriesOrder={formatSeriesOrder}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-2">
          <HistogramChart title="Distribution of Works by Age" bins={worksByAgeBins} />
        </div>
      </div>
    </Layout>
  );
}