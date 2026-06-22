import { Layout } from '../../../shared/components/Layout';

export function RegisterPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">✍️ Register</h1>
        <p className="text-lg text-gray-600">
          Create a new account to start managing your book library.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-900 mb-2">Feature: Auth (Register)</h2>
          <p className="text-green-800">This is a placeholder for the Register form.</p>
        </div>
      </div>
    </Layout>
  );
}