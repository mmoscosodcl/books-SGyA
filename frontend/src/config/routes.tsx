import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage, RegisterPage, LogoutPage } from '../features/auth';
import { BooksPage, BookCreatePage, BookEditPage, BookManagementPage, BookDetailPage } from '../features/books';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/logout" element={<LogoutPage />} />

        <Route path="/books/:isbn13" element={<BookDetailPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/books/manage" element={<ProtectedRoute><BookManagementPage /></ProtectedRoute>} />
        <Route path="/books/create" element={<ProtectedRoute><BookCreatePage /></ProtectedRoute>} />
        <Route path="/books/:isbn13/edit" element={<ProtectedRoute><BookEditPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}