import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { createBook } from '../../../shared/store/slices/booksSlice';

export function BookCreatePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((s) => s.books);

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    isbn13: '',
    categoria: '',
    formato: 'Papel' as 'Papel' | 'Digital',
    precio: 1,
    stock: 1,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(createBook(form));
    if (result.meta.requestStatus === 'fulfilled') navigate('/books/manage');
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold">Create Book</h1>
        {error && <div className="p-3 rounded bg-red-50 text-red-700">{error}</div>}

        {Object.entries(form).map(([key, value]) =>
          key === 'formato' ? (
            <select key={key} className="w-full border p-2 rounded" value={form.formato}
              onChange={(e) => setForm((p) => ({ ...p, formato: e.target.value as any }))}>
              <option value="Papel">Papel</option>
              <option value="Digital">Digital</option>
              <option value="Audiobook">Audiobook</option>
            </select>
          ) : (
            <input
              key={key}
              className="w-full border p-2 rounded"
              placeholder={key}
              value={value as string | number}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  [key]: key === 'precio' || key === 'stock' ? Number(e.target.value) : e.target.value,
                }))
              }
              required
            />
          ),
        )}

        <button disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {isLoading ? 'Saving...' : 'Create'}
        </button>
      </form>
    </Layout>
  );
}