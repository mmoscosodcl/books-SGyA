import { Layout } from '../shared/components/Layout';

export function HomePage() {
  return (
    <Layout>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to Librería SGyA</h1>
          <p className="text-xl text-gray-600">
            A modern library management system built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">📚 Books</h2>
            <p className="text-gray-600">Browse and manage your book catalog efficiently.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-green-600 mb-2">🔐 Auth</h2>
            <p className="text-gray-600">Secure login and registration for all users.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold text-purple-600 mb-2">📊 Dashboard</h2>
            <p className="text-gray-600">Track analytics and insights at a glance.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}