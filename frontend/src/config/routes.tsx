import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { BooksPage } from '../features/books/pages/BooksPage';
import { BookManagementPage } from '../features/books/pages/BookManagementPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';
import { LogoutPage } from '../features/auth/pages/LogoutPage';



export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />

        <Route
          path="/books/manage"
          element={
            <ProtectedRoute>
              <BookManagementPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  );
}