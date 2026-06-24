import { useEffect, useState } from 'react';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { fetchBooks, deleteBook } from '../../../shared/store/slices/booksSlice';
import type { Book } from '../../../shared/types';

export function BookManagementPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.books);
  const [editingIsbn, setEditingIsbn] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = async (isbn13: string) => {
    if (window.confirm(`Are you sure you want to delete this book?`)) {
      await dispatch(deleteBook(isbn13));
      setDeleteConfirm(null);
    }
  };

  const handleEdit = (isbn13: string) => {
    setEditingIsbn(editingIsbn === isbn13 ? null : isbn13);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Manage Books</h1>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            + Add Book
          </button>
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
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    ISBN13
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((book) => (
                  <tr key={book.isbn13} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{book.titulo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{book.autor}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {book.isbn13}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      ${book.precio.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          book.stock > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {book.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <button
                        onClick={() => handleEdit(book.isbn13)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.isbn13)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}