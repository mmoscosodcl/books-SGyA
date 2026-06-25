import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { fetchBookByIsbn } from '../../../shared/store/slices/booksSlice';

export function BookDetailPage() {
  const { isbn13 = '' } = useParams();
  const dispatch = useAppDispatch();
  const { selectedBook, isLoading, error } = useAppSelector((state) => state.books);

  useEffect(() => {
    if (isbn13) {
      dispatch(fetchBookByIsbn(isbn13));
    }
  }, [dispatch, isbn13]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Book Detail</h1>
          <Link to="/books" className="text-blue-600 hover:underline">
            Back to books
          </Link>
        </div>

        {isLoading && <p className="text-gray-600">Loading book...</p>}
        {error && <div className="p-3 rounded bg-red-50 text-red-700">{error}</div>}

        {!isLoading && !error && selectedBook && (
          <div className="bg-white border rounded-lg p-6 space-y-3">
            <p><span className="font-semibold">Title:</span> {selectedBook.titulo}</p>
            <p><span className="font-semibold">Author:</span> {selectedBook.autor}</p>
            <p><span className="font-semibold">ISBN13:</span> {selectedBook.isbn13}</p>
            <p><span className="font-semibold">Category:</span> {selectedBook.categoria}</p>
            <p><span className="font-semibold">Format:</span> {selectedBook.formato}</p>
            <p><span className="font-semibold">Price:</span> ${selectedBook.precio}</p>
            <p><span className="font-semibold">Stock:</span> {selectedBook.stock}</p>
            <p>
              <span className="font-semibold">Discontinued:</span>{' '}
              {selectedBook.discontinued ? 'Yes' : 'No'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}