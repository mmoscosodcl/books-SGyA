import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { clearError, loginUser } from '../../../shared/store/slices/authSlice';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/'); // success
    } catch {
      // error already in slice
    }
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
        {error && <div className="p-3 rounded bg-red-50 text-red-700">{error}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          autoComplete="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </Layout>
  );
}