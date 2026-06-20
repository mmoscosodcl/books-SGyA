import { Book, BOOK_FORMAT } from '../../domain/models/book';

export const seedBooks: Book[] = [
    // --- CATEGORÍA: PROGRAMACIÓN ---
    {
        titulo: 'Clean Architecture: A Craftsman\'s Guide',
        autor: 'Robert C. Martin',
        isbn13: '978-0134494166',
        categoria: 'Programación',
        formato: BOOK_FORMAT.PAPEL,
        precio: 35.50,
        stock: 45,
    },
    {
        titulo: 'The Pragmatic Programmer',
        autor: 'Andrew Hunt',
        isbn13: '978-0135957059',
        categoria: 'Programación',
        formato: BOOK_FORMAT.PAPEL,
        precio: 40.00,
        stock: 3, // Ideal para probar el estado 'Bajo Stock'
    },
    {
        titulo: 'Domain-Driven Design',
        autor: 'Eric Evans',
        isbn13: '978-0321125217',
        categoria: 'Programación',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 24.99, // Cumple regla: <= 25.00
        stock: 9999,   // Cumple regla: stock forzado digital
    },
    {
        titulo: 'Patrones de Diseño (GoF)',
        autor: 'Erich Gamma',
        isbn13: '978-0201633610',
        categoria: 'Programación',
        formato: BOOK_FORMAT.PAPEL,
        precio: 55.00,
        stock: 2,
        discontinued: true, // Cumple regla: inmutable, no editable
    },

    // --- CATEGORÍA: CIENCIA FICCIÓN ---
    {
        titulo: 'Dune',
        autor: 'Frank Herbert',
        isbn13: '978-0441172719',
        categoria: 'Ciencia Ficción',
        formato: BOOK_FORMAT.PAPEL,
        precio: 19.99,
        stock: 0, // Ideal para probar el estado 'Agotado'
    },
    {
        titulo: '1984',
        autor: 'George Orwell',
        isbn13: '978-0451524935',
        categoria: 'Ciencia Ficción',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 9.99,
        stock: 9999,
    },
    {
        titulo: 'Guía del Autoestopista Galáctico',
        autor: 'Douglas Adams',
        isbn13: '978-0345391803',
        categoria: 'Ciencia Ficción',
        formato: BOOK_FORMAT.PAPEL,
        precio: 15.00,
        stock: 0,
        discontinued: true,
    },

    // --- CATEGORÍA: FANTASÍA ---
    {
        titulo: 'El Señor de los Anillos',
        autor: 'J.R.R. Tolkien',
        isbn13: '978-0544003415',
        categoria: 'Fantasía',
        formato: BOOK_FORMAT.PAPEL,
        precio: 45.00,
        stock: 5,
    },
    {
        titulo: 'Harry Potter y la Piedra Filosofal',
        autor: 'J.K. Rowling',
        isbn13: '978-8498387070',
        categoria: 'Fantasía',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 12.99,
        stock: 9999,
    },

    // --- CATEGORÍA: NEGOCIOS / DESARROLLO PERSONAL ---
    {
        titulo: 'Atomic Habits',
        autor: 'James Clear',
        isbn13: '978-0735211292',
        categoria: 'Negocios',
        formato: BOOK_FORMAT.PAPEL,
        precio: 22.00,
        stock: 120, // Stock robusto para balancear el KPI de valor financiero
    },
    {
        titulo: 'Thinking, Fast and Slow',
        autor: 'Daniel Kahneman',
        isbn13: '978-0374533557',
        categoria: 'Negocios',
        formato: BOOK_FORMAT.PAPEL,
        precio: 20.00,
        stock: 35,
    },
    {
        titulo: 'Hábitos Ricos',
        autor: 'Thomas C. Corley',
        isbn13: '978-1635820461',
        categoria: 'Negocios',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 19.99,
        stock: 9999,
    },

    // --- CATEGORÍA: HISTORIA / NO FICCIÓN ---
    {
        titulo: 'Sapiens',
        autor: 'Yuval Noah Harari',
        isbn13: '978-0062316097',
        categoria: 'Historia',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 15.50,
        stock: 9999,
    },
    {
        titulo: 'Meditaciones',
        autor: 'Marco Aurelio',
        isbn13: '978-0812968255',
        categoria: 'Historia',
        formato: BOOK_FORMAT.PAPEL,
        precio: 12.00,
        stock: 8,
    },
    {
        titulo: 'Armas, Gérmenes y Acero',
        autor: 'Jared Diamond',
        isbn13: '978-8483463264',
        categoria: 'Historia',
        formato: BOOK_FORMAT.PAPEL,
        precio: 21.00,
        stock: 0,
    }
];