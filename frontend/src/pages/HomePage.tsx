import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { fetchBooks } from '../shared/store/slices/booksSlice';
import { clearFilters, setFilters } from '../shared/store/slices/booksSlice';
import { selectFilteredBooks } from '../shared/store/selectors/booksSelectors';

export function HomePage() {
  const dispatch = useAppDispatch();
  const { isLoading, error, filters } = useAppSelector((state) => state.books);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const books = useAppSelector(selectFilteredBooks);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Librería SGyA
          </h1>
          <p className="text-xl text-gray-600">
            A modern library management system built with React and TypeScript.
          </p>
        </div>

        {/* Filters */}
        <section className="bg-white border rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={filters.author}
              onChange={(e) => dispatch(setFilters({ author: e.target.value }))}
              placeholder="Search by author"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              value={filters.category}
              onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
              placeholder="Search by category"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => dispatch(setFilters({ minPrice: e.target.value }))}
              placeholder="Min price"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => dispatch(setFilters({ maxPrice: e.target.value }))}
              placeholder="Max price"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => dispatch(clearFilters())}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Clear filters
            </button>
          </div>
        </section>

        {/* Catalog */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {isLoading ? (
          <p className="text-gray-600 text-center py-8">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No books match the filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
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
                  <span className="text-lg font-bold text-blue-600">
                    ${book.precio}
                  </span>
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

                <div className="mt-4 flex gap-3">
                  <Link
                    to={`/books/${book.isbn13}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View detail
                  </Link>

                  {isAuthenticated && (
                    <Link
                      to={`/books/${book.isbn13}/edit`}
                      className="text-sm text-gray-700 hover:underline"
                    >
                      Edit
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}