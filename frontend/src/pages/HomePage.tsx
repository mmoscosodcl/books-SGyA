import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { fetchBooks } from '../shared/store/slices/booksSlice';

export function HomePage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.books);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">BookSGyA</h1>
        </div>

        {/* Books Catalog */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">Catalogo</h2>
            {isAuthenticated && (
              <Link
                to="/books/manage"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Manage Books
              </Link>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          {isLoading ? (
            <p className="text-gray-600 text-center py-8">Loading books...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No books available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((book) => (
                <div
                  key={book.isbn13}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {book.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">by {book.autor}</p>
                  <p className="text-xs text-gray-500 mb-3">{book.isbn13}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">${book.precio}</span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        book.stock > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                    </span>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}