import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { selectFilteredBooks, getBookStatus } from './booksSelectors';

const selectAnalytics = (state: RootState) => state.dashboard.data;

export const selectImpactKpis = createSelector([selectFilteredBooks], (books) => {
  const inventoryValue = books.reduce((sum, b) => sum + (b.precio * b.stock), 0);
  const stockAlertIndex = books.filter((b) => {
    const est = getBookStatus(b);
    return est === 'Bajo Stock' || est === 'Agotado';
  }).length;

  return {
    inventoryValue,
    stockAlertIndex,
  };
});

export const selectCategoryDonut = createSelector([selectFilteredBooks], (books) => {
  const map: Record<string, number> = {};
  books.forEach((b) => {
    const cat = b.categoria || 'Sin categoría';
    map[cat] = (map[cat] || 0) + 1;
  });
  return Object.entries(map).map(([label, value]) => ({ label, value }));
});


export const selectFormatVsStock = createSelector([selectFilteredBooks], (books) => {
    const stockByBinding = { 'Tapa Dura': 0, 'Tapa Blanda': 0 };
    books.forEach((b) => {
      if (b.formato === 'Papel' && b.bindingType) {
        if (b.bindingType === 'Tapa Dura' || b.bindingType === 'Tapa Blanda') {
          stockByBinding[b.bindingType] += b.stock;
        }
      }
    });
    return [
        {
          label: 'Stock actual',
          series: {
           'Tapa Dura': stockByBinding['Tapa Dura'],
           'Tapa Blanda': stockByBinding['Tapa Blanda'],
          },
        },
    ];
});



export const selectFormatSeriesOrder = createSelector(
  [selectAnalytics],
  () => ['Tapa Dura', 'Tapa Blanda'],
);

export const selectWorksByAgeBins = createSelector([selectFilteredBooks], (books) => {
  const currentYear = new Date().getFullYear();
  const bins = { '0-5': 0, '6-10': 0, '11-20': 0, '21+': 0, 'Desconocida': 0 };
  books.forEach((b) => {
   if (!b.publicationDate) {
      bins['Desconocida'] += 1;
      return;
    }
    const pubYear = new Date(b.publicationDate).getFullYear();
    if (Number.isNaN(pubYear)) {
      bins['Desconocida'] += 1;
      return;
    }
    const age = currentYear - pubYear;
    if (age <= 5) bins['0-5'] += 1;
    else if (age <= 10) bins['6-10'] += 1;
    else if (age <= 20) bins['11-20'] += 1;
    else bins['21+'] += 1;
  });
  return Object.entries(bins)
    .filter(([_, count]) => count > 0)
    .map(([rangeLabel, count]) => ({ rangeLabel, count }));
});