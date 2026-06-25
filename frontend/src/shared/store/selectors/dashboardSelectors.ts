import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

const selectDashboardState = (state: RootState) => state.dashboard;

export const selectAnalyticsData = createSelector(
  selectDashboardState,
  (state) => state.data,
);

export const selectDashboardCards = createSelector(
  selectAnalyticsData,
  (data) => {
    if (!data) return [];

    return [
      { label: 'Total Books', value: data.totalBooks },
      { label: 'Average Price', value: `$${data.averagePrice.toFixed(2)}` },
      { label: 'Total Stock', value: data.totalStock },
      { label: 'Formats', value: Object.keys(data.booksByFormat).length },
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