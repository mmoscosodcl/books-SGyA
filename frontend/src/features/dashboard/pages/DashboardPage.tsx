import { useEffect } from 'react';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { fetchAnalytics } from '../../../shared/store/slices/dashboardSlice';

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, needsRefresh } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  useEffect(() => {
    if (!data || needsRefresh) {
      dispatch(fetchAnalytics());
    }
  }, [needsRefresh, data, dispatch]);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>

        {isLoading && <p className="text-gray-600">Loading analytics...</p>}
        {error && <div className="p-3 rounded bg-red-50 text-red-700 border border-red-200">{error}</div>}

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Books</p>
                <p className="text-2xl font-bold">{data.totalBooks}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Average Price</p>
                <p className="text-2xl font-bold">${data.averagePrice.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Stock</p>
                <p className="text-2xl font-bold">{data.totalStock}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Formats</p>
                <p className="text-2xl font-bold">{Object.keys(data.booksByFormat).length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border p-4">
                <h2 className="font-semibold mb-3">Books by Format</h2>
                <ul className="space-y-2">
                  {Object.entries(data.booksByFormat).map(([k, v]) => (
                    <li key={k} className="flex justify-between">
                      <span>{k}</span>
                      <span className="font-semibold">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg border p-4">
                <h2 className="font-semibold mb-3">Books by Status</h2>
                <ul className="space-y-2">
                  {Object.entries(data.booksByStatus).map(([k, v]) => (
                    <li key={k} className="flex justify-between">
                      <span>{k}</span>
                      <span className="font-semibold">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}