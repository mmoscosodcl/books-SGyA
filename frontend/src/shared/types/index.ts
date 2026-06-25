export interface Book {
  isbn13: string;
  titulo: string;
  autor: string;
  categoria: string;
  formato: 'Papel' | 'Digital';
  precio: number;
  stock: number;
  discontinued?: boolean;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface AnalyticsResponse {
  totalBooks: number;
  booksByFormat: Record<string, number>;
  booksByStatus: Record<string, number>;
  averagePrice: number;
  totalStock: number;

  inventoryValue: number;
  booksByCategory: Record<string, number>;
  stockByFormat: Record<string, number>; // Papel | Digital
  worksByAgeBins: Record<string, number>;
}

