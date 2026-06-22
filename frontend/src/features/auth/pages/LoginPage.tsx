import { Layout } from '../../../shared/components/Layout';

export function LoginPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">🔐 Login</h1>
        <p className="text-lg text-gray-600">
          Sign in to access your account and manage your books.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-900 mb-2">Feature: Auth (Login)</h2>
          <p className="text-green-800">This is a placeholder for the Login form.</p>
        </div>
      </div>
    </Layout>
  );
}