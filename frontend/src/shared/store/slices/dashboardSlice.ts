import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/config';
import type { AnalyticsResponse } from '../../types';
import { createBook, deleteBook, updateBook, updateBookStock } from './booksSlice';


interface DashboardState {
  data: AnalyticsResponse | null;
  isLoading: boolean;
  error: string | null;
  needsRefresh: boolean;
}

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
  needsRefresh: false
};


export const fetchAnalytics = createAsyncThunk(
  'dashboard/fetchAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<AnalyticsResponse>(API_ENDPOINTS.AUTH_ANALYTICS);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.detail ?? 'Failed to fetch analytics');
    }
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetNeedsRefresh(state) {
      state.needsRefresh = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnalytics.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.needsRefresh = false;
    });
    builder.addCase(fetchAnalytics.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.needsRefresh = false; // Reset flag after fetch
    });
    builder.addCase(fetchAnalytics.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.payload ?? 'Failed to fetch analytics');
    });

    builder.addCase(createBook.fulfilled, (state) => {
      state.needsRefresh = true;
    });
    builder.addCase(updateBook.fulfilled, (state) => {
      state.needsRefresh = true;
    });
    builder.addCase(updateBookStock.fulfilled, (state) => {
      state.needsRefresh = true;
    });
    builder.addCase(deleteBook.fulfilled, (state) => {
      state.needsRefresh = true;
    });
  },
});

export const { resetNeedsRefresh } = dashboardSlice.actions;
export default dashboardSlice.reducer;