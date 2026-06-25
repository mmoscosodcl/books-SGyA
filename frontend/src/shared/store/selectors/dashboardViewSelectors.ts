import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

const selectAnalytics = (state: RootState) => state.dashboard.data;

export const selectImpactKpis = createSelector([selectAnalytics], (a) => {
  if (!a) return { inventoryValue: 0, stockAlertIndex: 0 };

  const bajo = a.booksByStatus['Bajo Stock'] ?? 0;
  const sin = a.booksByStatus['Sin Stock'] ?? 0;
  const stockAlertIndex = a.totalBooks ? ((bajo + sin) / a.totalBooks) * 100 : 0;

  return {
    inventoryValue: a.inventoryValue ?? 0,
    stockAlertIndex,
  };
});

export const selectCategoryDonut = createSelector([selectAnalytics], (a) => {
  const map = a?.booksByCategory ?? {};
  return Object.entries(map).map(([label, value]) => ({ label, value: Number(value) }));
});


export const selectFormatVsStock = createSelector([selectAnalytics], (a) => {
  const stockByFormat = a?.stockByFormat ?? {};
  return [
    {
      label: 'Stock actual',
      series: {
        Papel: Number(stockByFormat['Papel'] ?? 0),
        Digital: Number(stockByFormat['Digital'] ?? 0),
      },
    },
  ];
});

export const selectFormatSeriesOrder = createSelector(
  [selectAnalytics],
  () => ['Papel', 'Digital'],
);

export const selectWorksByAgeBins = createSelector([selectAnalytics], (a) => {
  const bins = a?.worksByAgeBins ?? {};
  return Object.entries(bins).map(([rangeLabel, count]) => ({
    rangeLabel,
    count: Number(count),
  }));
});