import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { selectFilteredBooks } from './booksSelectors';

const selectDashboardState = (state: RootState) => state.dashboard;

export const selectAnalyticsData = createSelector(
  selectDashboardState,
  (state) => state.data,
);

export const selectDashboardCards = createSelector(
  [selectFilteredBooks],
  (books) => {
    const totalBooks = books.length;
    const totalPrice = books.reduce((sum, b) => sum + b.precio, 0);
    const averagePrice = totalBooks ? totalPrice / totalBooks : 0;
    const totalStock = books.reduce((sum, b) => sum + b.stock, 0);
    const formats = new Set(books.map((b) => b.formato)).size;

     return [
      { label: 'Total Books', value: totalBooks },
      { label: 'Average Price', value: `$${averagePrice.toFixed(2)}` },
      { label: 'Total Stock', value: totalStock },
      { label: 'Formats', value: formats },
     ];
  },
);

export const selectDashboardCharts = createSelector(
  selectAnalyticsData,
  (data) => {
    if (!data) {
      return {
        formats: [],
        statuses: [],
      };
    }

    return {
      formats: Object.entries(data.booksByFormat).map(([label, value]) => ({
        label,
        value,
      })),
      statuses: Object.entries(data.booksByStatus).map(([label, value]) => ({
        label,
        value,
      })),
    };
  },
);