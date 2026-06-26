import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { deleteBook, fetchBookByIsbn, updateBook, updateBookStock } from '../../../shared/store/slices/booksSlice';

export function BookEditPage() {
  const { isbn13 = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedBook, isLoading, error } = useAppSelector((s) => s.books);

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    formato: 'Papel' as 'Papel' | 'Digital',
    precio: 1,
    stock: 1,
    discontinued: false,
    publicationDate: '',
    bindingType: '' as 'Tapa Dura' | 'Tapa Blanda' | '',
  });

  useEffect(() => {
    if (isbn13) dispatch(fetchBookByIsbn(isbn13));
  }, [dispatch, isbn13]);

  useEffect(() => {
    if (selectedBook) {
      setForm({
        titulo: selectedBook.titulo,
        autor: selectedBook.autor,
        categoria: selectedBook.categoria,
        formato: selectedBook.formato,
        precio: selectedBook.precio,
        stock: selectedBook.stock,
        discontinued: !!selectedBook.discontinued,
        publicationDate: selectedBook.publicationDate || '',
        bindingType: selectedBook.bindingType || '',
      });
    }
  }, [selectedBook]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      bindingType: form.formato === 'Papel' ? (form.bindingType || undefined) : undefined,
    };
    const result = await dispatch(updateBook({ isbn13, data }));
    if (result.meta.requestStatus === 'fulfilled') navigate('/books/manage');
  };

  const onStock = async (delta: number) => {
    const next = Math.max(0, form.stock + delta);
    setForm((p) => ({ ...p, stock: next }));
    await dispatch(updateBookStock({ isbn13, stock: next }));
  };

  const onDelete = async () => {
    if (!window.confirm('Delete this book?')) return;
    const result = await dispatch(deleteBook(isbn13));
    if (result.meta.requestStatus === 'fulfilled') navigate('/books/manage');
  };

  return (
    <Layout>
      <form onSubmit={onSave} className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold">Edit Book</h1>
        {error && <div className="p-3 rounded bg-red-50 text-red-700">{error}</div>}

        <input className="w-full border p-2 rounded" value={form.titulo} onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))} />
        <input className="w-full border p-2 rounded" value={form.autor} onChange={(e) => setForm((p) => ({ ...p, autor: e.target.value }))} />
        <input className="w-full border p-2 rounded" value={form.categoria} onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))} />


        <select className="w-full border p-2 rounded" value={form.formato} onChange={(e) => setForm((p) => ({ ...p, formato: e.target.value as 'Papel' | 'Digital' }))}>
          <option value="Papel">Papel</option>
          <option value="Digital">Digital</option>
        </select>

            {form.formato === 'Papel' && (
              <select
                className="w-full border p-2 rounded"
                value={form.bindingType}
                onChange={(e) => setForm((p) => ({ ...p, bindingType: e.target.value as 'Tapa Dura' | 'Tapa Blanda' }))}
                required
              >
                <option value="">Select Binding Type...</option>
                <option value="Tapa Dura">Tapa Dura</option>
                <option value="Tapa Blanda">Tapa Blanda</option>
              </select>
            )}

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={form.publicationDate}
              onChange={(e) => setForm((p) => ({ ...p, publicationDate: e.target.value }))}
              required
            />

        <input type="number" className="w-full border p-2 rounded" value={form.precio} onChange={(e) => setForm((p) => ({ ...p, precio: Number(e.target.value) }))} />

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onStock(-1)} className="px-3 py-1 border rounded">-</button>
          <input type="number" className="w-28 border p-2 rounded" value={form.stock}
            onChange={(e) => setForm((p) => ({ ...p, stock: Number(e.target.value) }))} />
          <button type="button" onClick={() => onStock(1)} className="px-3 py-1 border rounded">+</button>
        </div>

        <div className="flex gap-3">
          <button disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {isLoading ? 'Saving...' : 'Save changes'}
          </button>
          <button type="button" onClick={onDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </form>
    </Layout>
  );
}