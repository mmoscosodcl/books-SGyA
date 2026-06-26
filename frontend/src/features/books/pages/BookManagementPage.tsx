import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { deleteBook, fetchBooks, updateBookStock } from '../../../shared/store/slices/booksSlice';
import { selectBooksTableRows } from '../../../shared/store/selectors/booksSelectors';
import { BookFilters } from '../../books/components/BookFilters';

export function BookManagementPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((s) => s.books);
  const rows = useAppSelector(selectBooksTableRows);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Books</h1>
          <Link
            to="/books/create"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add book
          </Link>
        </div>

        <BookFilters />
        {error && <div className="p-3 rounded bg-red-50 text-red-700">{error}</div>}
        {isLoading ? <p>Loading...</p> : null}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.isbn13} className="border-t">
                  <td className="px-4 py-3">{b.titulo}</td>
                  <td className="px-4 py-3">{b.autor}</td>
                  <td className="px-4 py-3">{b.categoria}</td>
                  <td className="px-4 py-3">${b.precio.toFixed(2)}</td>
                  <td className="px-4 py-3">{b.stock}</td>
                  <td className="px-4 py-3">{b.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/books/${b.isbn13}`}
                        className="px-3 py-1 bg-gray-600 text-white rounded"
                      >
                        View
                      </Link>
                      <Link
                        to={`/books/${b.isbn13}/edit`}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => dispatch(updateBookStock({ isbn13: b.isbn13, stock: Math.max(0, b.stock - 1) }))}
                        className="px-3 py-1 border rounded"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => dispatch(deleteBook(b.isbn13))}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}