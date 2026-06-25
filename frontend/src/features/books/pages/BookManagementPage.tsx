import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { deleteBook, fetchBooks, updateBookStock } from '../../../shared/store/slices/booksSlice';

export function BookManagementPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((s) => s.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Books</h1>
          <Link to="/books/create" className="bg-green-600 text-white px-4 py-2 rounded">+ Add book</Link>
        </div>

        {error && <div className="p-3 rounded bg-red-50 text-red-700">{error}</div>}
        {isLoading ? <p>Loading...</p> : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((b) => (
            <div key={b.isbn13} className="bg-white border rounded p-4 space-y-2">
              <h2 className="font-semibold">{b.titulo}</h2>
              <p className="text-sm text-gray-500">{b.autor}</p>
              <p className="text-sm">Stock: <span className="font-semibold">{b.stock}</span></p>

              <div className="flex gap-2">
                <button onClick={() => dispatch(updateBookStock({ isbn13: b.isbn13, stock: Math.max(0, b.stock - 1) }))}
                  className="px-2 py-1 border rounded">-1 stock</button>
                <button onClick={() => dispatch(updateBookStock({ isbn13: b.isbn13, stock: b.stock + 1 }))}
                  className="px-2 py-1 border rounded">+1 stock</button>
              </div>

              <div className="flex gap-2">
                <Link to={`/books/${b.isbn13}`} className="px-3 py-1 bg-gray-600 text-white rounded">View</Link>
                <Link to={`/books/${b.isbn13}/edit`} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</Link>
                <button onClick={() => dispatch(deleteBook(b.isbn13))} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}