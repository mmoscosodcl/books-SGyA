import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/config';
import type { Book } from '../../types';

interface BooksState {
  items: Book[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<Book[]>(API_ENDPOINTS.BOOKS_LIST);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch books',
      );
    }
  },
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (isbn13: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(API_ENDPOINTS.BOOKS_DELETE(isbn13));
      return isbn13;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete book',
      );
    }
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch books
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.payload ?? 'Failed to fetch books');
    });

    // Delete book
    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = state.items.filter((b) => b.isbn13 !== action.payload);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.payload ?? 'Failed to delete book');
    });
  },
});

export default booksSlice.reducer;