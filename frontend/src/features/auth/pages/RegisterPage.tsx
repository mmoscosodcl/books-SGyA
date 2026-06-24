import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { registerUser, clearError } from '../../../shared/store/slices/authSlice';

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    // Validation
    if (!email || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // Call register thunk
    const result = await dispatch(registerUser({ email, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">✍️ Register</h1>

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded">
            ✅ Account created successfully! Redirecting to login...
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading || success}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading || success}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading || success}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </Layout>
  );
}