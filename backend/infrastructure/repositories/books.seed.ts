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
        publicationDate: '2017-09-20',
        bindingType: 'Tapa Dura'
    },
    {
        titulo: 'The Pragmatic Programmer',
        autor: 'Andrew Hunt',
        isbn13: '978-0135957059',
        categoria: 'Programación',
        formato: BOOK_FORMAT.PAPEL,
        precio: 40.00,
        stock: 3, 
        publicationDate: '1999-10-30',
        bindingType: 'Tapa Blanda'
    },
    {
        titulo: 'Domain-Driven Design',
        autor: 'Eric Evans',
        isbn13: '978-0321125217',
        categoria: 'Programación',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 24.99, 
        stock: 9999,   
        publicationDate: '2003-08-30'
        // Digital: sin bindingType
    },
    {
        titulo: 'Patrones de Diseño (GoF)',
        autor: 'Erich Gamma',
        isbn13: '978-0201633610',
        categoria: 'Programación',
        formato: BOOK_FORMAT.PAPEL,
        precio: 55.00,
        stock: 2,
        discontinued: true, 
        publicationDate: '1994-10-31',
        bindingType: 'Tapa Dura'
    },

    // --- CATEGORÍA: CIENCIA FICCIÓN ---
    {
        titulo: 'Dune',
        autor: 'Frank Herbert',
        isbn13: '978-0441172719',
        categoria: 'Ciencia Ficción',
        formato: BOOK_FORMAT.PAPEL,
        precio: 19.99,
        stock: 0, 
        publicationDate: '1965-08-01',
        bindingType: 'Tapa Blanda'
    },
    {
        titulo: '1984',
        autor: 'George Orwell',
        isbn13: '978-0451524935',
        categoria: 'Ciencia Ficción',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 9.99,
        stock: 9999,
        publicationDate: '1949-06-08'
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
        publicationDate: '1979-10-12',
        bindingType: 'Tapa Blanda'
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
        publicationDate: '1954-07-29',
        bindingType: 'Tapa Dura'
    },
    {
        titulo: 'Harry Potter y la Piedra Filosofal',
        autor: 'J.K. Rowling',
        isbn13: '978-8498387070',
        categoria: 'Fantasía',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 12.99,
        stock: 9999,
        publicationDate: '1997-06-26'
    },

    // --- CATEGORÍA: NEGOCIOS / DESARROLLO PERSONAL ---
    {
        titulo: 'Atomic Habits',
        autor: 'James Clear',
        isbn13: '978-0735211292',
        categoria: 'Negocios',
        formato: BOOK_FORMAT.PAPEL,
        precio: 22.00,
        stock: 120, 
        publicationDate: '2018-10-16',
        bindingType: 'Tapa Dura'
    },
    {
        titulo: 'Thinking, Fast and Slow',
        autor: 'Daniel Kahneman',
        isbn13: '978-0374533557',
        categoria: 'Negocios',
        formato: BOOK_FORMAT.PAPEL,
        precio: 20.00,
        stock: 35,
        publicationDate: '2011-10-25',
        bindingType: 'Tapa Blanda'
    },
    {
        titulo: 'Hábitos Ricos',
        autor: 'Thomas C. Corley',
        isbn13: '978-1635820461',
        categoria: 'Negocios',
        formato: BOOK_FORMAT.DIGITAL,
        precio: 19.99,
        stock: 9999,
        publicationDate: '2010-03-01'
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
        publicationDate: '2011-09-04'
    },
    {
        titulo: 'Meditaciones (Edición Moderna)',
        autor: 'Marco Aurelio',
        isbn13: '978-0812968255',
        categoria: 'Historia',
        formato: BOOK_FORMAT.PAPEL,
        precio: 12.00,
        stock: 8,
        publicationDate: '2006-05-02',
        bindingType: 'Tapa Blanda'
    },
    {
        titulo: 'Armas, Gérmenes y Acero',
        autor: 'Jared Diamond',
        isbn13: '978-8483463264',
        categoria: 'Historia',
        formato: BOOK_FORMAT.PAPEL,
        precio: 21.00,
        stock: 0,
        publicationDate: '1997-03-01',
        bindingType: 'Tapa Blanda'
    }
];