import { useEffect } from 'react';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/';
import { fetchBooks } from '../../../shared/store/slices/booksSlice';

export function BooksPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">📚 Books</h1>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {isLoading ? (
          <p className="text-gray-600">Loading books...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-600">No books available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((book) => (
              <div
                key={book.isbn13}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900">{book.titulo}</h3>
                <p className="text-sm text-gray-600">by {book.autor}</p>
                <p className="text-xs text-gray-500 mt-1">{book.isbn13}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-blue-600">${book.precio}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      book.stock > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    Stock: {book.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}