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
    discontinued : false,
    publicationDate: '',
    bindingType: '' as 'Tapa Dura' | 'Tapa Blanda'
  });


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      bindingType: form.formato === 'Papel' ? (form.bindingType || undefined) : undefined,
    };
    const result = await dispatch(createBook(data));
    if (result.meta.requestStatus === 'fulfilled') navigate('/books/manage');
  };

  return (
  <Layout>
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Create Book</h1>
      {error && <div className="p-3 rounded bg-red-50 text-red-700">{error}</div>}

      {Object.entries(form).map(([key, value]) => {
        if (key === 'bindingType' || key === 'publicationDate') return null;

        if (key === 'formato') {
          return (
            <div key={key} className="space-y-4">
              <select
                className="w-full border p-2 rounded"
                value={form.formato}
                onChange={(e) =>
                  setForm((p) => ({ ...p, formato: e.target.value as 'Papel' | 'Digital' }))
                }
              >
                <option value="Papel">Papel</option>
                <option value="Digital">Digital</option>
              </select>

              {/* Renderizado Condicional de bindingType */}
              {form.formato === 'Papel' && (
                <select
                  className="w-full border p-2 rounded"
                  value={form.bindingType || ''}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, bindingType: e.target.value as 'Tapa Dura' | 'Tapa Blanda' }))
                  }
                  required
                >
                  <option value="">Select Binding Type...</option>
                  <option value="Tapa Dura">Tapa Dura</option>
                  <option value="Tapa Blanda">Tapa Blanda</option>
                </select>
              )}
            </div>
          );
        }


        return (
          <input
            key={key}
            className="w-full border p-2 rounded capitalize"
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
        );
      })}


      <input
        type="date"
        className="w-full border p-2 rounded"
        value={form.publicationDate}
        onChange={(e) => setForm((p) => ({ ...p, publicationDate: e.target.value }))}
        required
      />

      <button disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {isLoading ? 'Saving...' : 'Create'}
      </button>
    </form>
  </Layout>
);
}