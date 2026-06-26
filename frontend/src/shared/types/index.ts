export interface Book {
  isbn13: string;
  titulo: string;
  autor: string;
  categoria: string;
  formato: 'Papel' | 'Digital';
  precio: number;
  stock: number;
  discontinued?: boolean;
  publicationDate: string;
  bindingType?: 'Tapa Dura' | 'Tapa Blanda';
  status?: 'Disponible' | 'Bajo Stock' | 'Agotado' | 'Descontinuado';
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
  worksByAgeBins: Record<string, number>;
  stockByBindingType: Record<string, number>; 
}

