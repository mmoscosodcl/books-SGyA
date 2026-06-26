import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient, getErrorMessage } from '../../api/client';
import { API_ENDPOINTS } from '../../api/config';
import type { User } from '../../types';

type LoginPayload = { email: string; password: string };
type LoginResponse = { access_token: string; user?: User };

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
};

const initialState: AuthState = {
  token: getStoredToken(),
  user: getStoredUser(),
  isAuthenticated: !!getStoredToken(),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH_LOGIN, payload);

      // backend contract expected: { access_token, user? }
      localStorage.setItem(TOKEN_KEY, data.access_token);
      if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch books'));
    }
  },
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post<{ id: string; email: string }>(
        API_ENDPOINTS.AUTH_REGISTER,
        payload,
      );
      return data;
    } catch (error) {
      rejectWithValue(getErrorMessage(error, 'Registration failed'));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });
  builder.addCase(registerUser.fulfilled, (state) => {
    state.isLoading = false;
  });
  builder.addCase(registerUser.rejected, (state, action) => {
    state.isLoading = false;
    state.error = String(action.payload ?? 'Registration failed');
  });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.access_token;
      state.user = action.payload.user ?? null;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.payload ?? 'Login failed');
      state.isAuthenticated = false;
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;