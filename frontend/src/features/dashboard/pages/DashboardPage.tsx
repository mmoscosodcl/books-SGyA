import { Layout } from '../../../shared/components/Layout';

export function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">📊 Dashboard</h1>
        <p className="text-lg text-gray-600">
          Your personalized dashboard with analytics and insights.
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-purple-900 mb-2">Feature: Dashboard</h2>
          <p className="text-purple-800">This is a placeholder for Dashboard analytics.</p>
        </div>
      </div>
    </Layout>
  );
}