import { Book, BookStatus } from '../models/book';
import { IBookRepository } from '../repositories/ibookrepository';
import {
    assertBookDeletable,
    calculateBookStatus,
    prepareBookForCreate,
    prepareBookForUpdate,
} from './book-rules';

export type BookWithStatus = Book & { status: BookStatus };

export class BookService {
    constructor(private readonly repository: IBookRepository) {}

    async list(): Promise<BookWithStatus[]> {
        const books = await this.repository.list();
        return books.map((book) => ({
            ...book,
            status: calculateBookStatus(book),
        }));
    }

    async getByIsbn13(isbn13: string): Promise<BookWithStatus | null> {
        const book = await this.repository.findByIsbn13(isbn13);
        if (!book) return null;

        return {
            ...book,
            status: calculateBookStatus(book),
        };
    }

    async create(input: Book): Promise<Book> {
        const existing = await this.repository.findByIsbn13(input.isbn13);
        if (existing) {
            throw new Error('A book with this ISBN13 already exists.');
        }

        const prepared = prepareBookForCreate(input);
        return this.repository.create(prepared);
    }

    async update(isbn13: string, patch: Partial<Book>): Promise<Book> {
        const current = await this.repository.findByIsbn13(isbn13);
        if (!current) {
            throw new Error('Book not found.');
        }

        const prepared = prepareBookForUpdate(current, patch);
        return this.repository.update(isbn13, prepared);
    }

    async delete(isbn13: string): Promise<void> {
        const current = await this.repository.findByIsbn13(isbn13);
        if (!current) {
            throw new Error('Book not found.');
        }

        assertBookDeletable(current);
        await this.repository.delete(isbn13);
    }
}