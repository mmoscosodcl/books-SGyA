export const BOOK_FORMAT = {
    PAPEL: 'Papel',
    DIGITAL: 'Digital',
} as const;

export type BookFormat = (typeof BOOK_FORMAT)[keyof typeof BOOK_FORMAT];

export const BOOK_STATUS = {
    AVAILABLE: 'Disponible',
    LOW_STOCK: 'Bajo Stock',
    OUT_OF_STOCK: 'Sin Stock',
    DISCONTINUED: 'Descontinuado',
} as const;

export type BookStatus = (typeof BOOK_STATUS)[keyof typeof BOOK_STATUS];

export interface Book {
    titulo: string;
    autor: string;
    isbn13: string;
    categoria: string;
    formato: BookFormat;
    precio: number;
    stock: number;
    discontinued?: boolean;
}