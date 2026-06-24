import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../shared/components/Layout';
import { useAppDispatch } from '../../../shared/hooks';
import { logout } from '../../../shared/store/slices/authSlice';

export function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/', { replace: true });
  }, [dispatch, navigate]);

  return (
    <Layout>
      <p className="text-center text-gray-600">Signing out...</p>
    </Layout>
  );
}