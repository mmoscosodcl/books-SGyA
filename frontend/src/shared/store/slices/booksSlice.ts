import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/config';
import type { Book } from '../../types';
import { addNotification } from './notificationsSlice';

export interface BookFilters {
  author: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

interface BooksState {
  items: Book[];
  selectedBook: Book | null;
  filters: BookFilters,
  isLoading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  selectedBook: null,
  filters: {
    author: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  },
  isLoading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<Book[]>(API_ENDPOINTS.BOOKS_LIST);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.detail ?? 'Failed to fetch books');
  }
});

export const fetchBookByIsbn = createAsyncThunk('books/fetchBookByIsbn', async (isbn13: string, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<Book>(API_ENDPOINTS.BOOKS_GET(isbn13));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.detail ?? 'Failed to fetch book');
  }
});

export const createBook = createAsyncThunk(
  'books/createBook',
  async (payload: Omit<Book, 'discontinued'>, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.post<Book>(API_ENDPOINTS.BOOKS_CREATE, payload);
      dispatch(addNotification({ type: 'success', message: 'Book created successfully' }));
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.detail ?? 'Failed to create book';
      dispatch(addNotification({ type: 'error', message }));
      return rejectWithValue(message);
    }
  },
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async (
    { isbn13, data }: { isbn13: string; data: Partial<Book> },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await apiClient.put<Book>(API_ENDPOINTS.BOOKS_UPDATE(isbn13), data);
      dispatch(addNotification({ type: 'success', message: 'Book updated successfully' }));
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.detail ?? 'Failed to update book';
      dispatch(addNotification({ type: 'error', message }));
      return rejectWithValue(message);
    }
  },
);

export const updateBookStock = createAsyncThunk(
  'books/updateBookStock',
  async (
    { isbn13, stock }: { isbn13: string; stock: number },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await apiClient.put<Book>(API_ENDPOINTS.BOOKS_UPDATE(isbn13), { stock });
      dispatch(addNotification({ type: 'success', message: 'Stock updated' }));
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.detail ?? 'Failed to update stock';
      dispatch(addNotification({ type: 'error', message }));
      return rejectWithValue(message);
    }
  },
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (isbn13: string, { rejectWithValue, dispatch }) => {
    try {
      await apiClient.delete(API_ENDPOINTS.BOOKS_DELETE(isbn13));
      dispatch(addNotification({ type: 'success', message: 'Book deleted successfully' }));
      return isbn13;
    } catch (error: any) {
      const message = error?.response?.data?.detail ?? 'Failed to delete book';
      dispatch(addNotification({ type: 'error', message }));
      return rejectWithValue(message);
    }
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<BookFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
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

    builder.addCase(fetchBookByIsbn.fulfilled, (state, action) => {
      state.selectedBook = action.payload;
    });

    builder.addCase(createBook.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(updateBook.fulfilled, (state, action) => {
      const i = state.items.findIndex((b) => b.isbn13 === action.payload.isbn13);
      if (i !== -1) state.items[i] = action.payload;
      state.selectedBook = action.payload;
    });

    builder.addCase(updateBookStock.fulfilled, (state, action) => {
      const i = state.items.findIndex((b) => b.isbn13 === action.payload.isbn13);
      if (i !== -1) state.items[i] = action.payload;
      if (state.selectedBook?.isbn13 === action.payload.isbn13) state.selectedBook = action.payload;
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.items = state.items.filter((b) => b.isbn13 !== action.payload);
      if (state.selectedBook?.isbn13 === action.payload) state.selectedBook = null;
    });
  },
});

export const { setFilters, clearFilters} = booksSlice.actions;
export default booksSlice.reducer;