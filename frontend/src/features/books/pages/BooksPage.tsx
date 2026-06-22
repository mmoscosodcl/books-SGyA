import { Layout } from '../../../shared/components/Layout';

export function BooksPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">📚 Books</h1>
        <p className="text-lg text-gray-600">
          Libros en formato digital y papel
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-2">Books</h2>
          <p className="text-blue-800"></p>
        </div>
      </div>
    </Layout>
  );
}