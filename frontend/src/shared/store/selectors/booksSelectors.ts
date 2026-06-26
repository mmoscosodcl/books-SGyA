import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Book } from '../../types';

const selectBooksState = (state: RootState) => state.books;

export function getBookStatus(book: Book): 'Disponible' | 'Bajo Stock' | 'Agotado' | 'Descontinuado' {
  if (book.discontinued) return 'Descontinuado';
  if (book.formato === 'Digital') return 'Disponible';
  if (book.stock <= 0) return 'Agotado';
  if (book.stock <= 5) return 'Bajo Stock';
  return 'Disponible';
}

export const selectBooksItems = createSelector(
  selectBooksState,
  (state) => state.items,
);

export const selectBookFilters = createSelector(
  selectBooksState,
  (state) => state.filters,
);

const normalize = (value: string) => value.trim().toLowerCase();

export const selectFilteredBooks = createSelector(
  [selectBooksItems, selectBookFilters],
  (books, filters) => {
    const authorQuery = normalize(filters.author);
    const categoryQuery = normalize(filters.category);

    const minPrice =
      filters.minPrice.trim() === '' ? null : Number(filters.minPrice);
    const maxPrice =
      filters.maxPrice.trim() === '' ? null : Number(filters.maxPrice);

    return books.filter((book) => {
      const authorMatch =
        !authorQuery || normalize(book.autor).includes(authorQuery);

      const categoryMatch =
        !categoryQuery || normalize(book.categoria).includes(categoryQuery);

      const minMatch =
        minPrice === null || Number.isNaN(minPrice) || book.precio >= minPrice;

      const maxMatch =
        maxPrice === null || Number.isNaN(maxPrice) || book.precio <= maxPrice;

      return authorMatch && categoryMatch && minMatch && maxMatch;
    });
  },
);

export const selectBooksTableRows = createSelector(
  [selectFilteredBooks],
  (books) =>
    books.map((book) => ({
      isbn13: book.isbn13,
      titulo: book.titulo,
      autor: book.autor,
      categoria: book.categoria,
      formato: book.formato,
      precio: book.precio,
      stock: book.stock,
      status: getBookStatus(book),
    })),
);

export const selectBooksChartData = createSelector(
  [selectFilteredBooks],
  (books) => {
    const byFormat: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    let totalPrice = 0;

    books.forEach((book) => {
      byFormat[book.formato] = (byFormat[book.formato] || 0) + 1;
      byCategory[book.categoria] = (byCategory[book.categoria] || 0) + 1;
      totalPrice += book.precio;
    });

    return {
      totalBooks: books.length,
      averagePrice: books.length ? totalPrice / books.length : 0,
      booksByFormat: Object.entries(byFormat).map(([label, value]) => ({
        label,
        value,
      })),
      booksByCategory: Object.entries(byCategory).map(([label, value]) => ({
        label,
        value,
      })),
    };
  },
);