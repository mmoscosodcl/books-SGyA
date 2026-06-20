import { Injectable } from '@nestjs/common';
import { Book } from '../../domain/models/book';
import { IBookRepository } from '../../domain/repositories/ibookrepository';
import { seedBooks } from './books.seed';

@Injectable()
export class InMemoryBookRepository implements IBookRepository {
    private readonly books: Map<string, Book>;

    constructor() {
        this.books = new Map(
            seedBooks.map((book) => [book.isbn13, this.clone(book)]),
        );
    }

    async findByIsbn13(isbn13: string): Promise<Book | null> {
        const book = this.books.get(isbn13);
        return book ? this.clone(book) : null;
    }

    async list(): Promise<Book[]> {
        return Array.from(this.books.values()).map((book) => this.clone(book));
    }

    async create(book: Book): Promise<Book> {
        if (this.books.has(book.isbn13)) {
            throw new Error('A book with this ISBN13 already exists.');
        }

        const toStore = this.clone(book);
        this.books.set(toStore.isbn13, toStore);

        return this.clone(toStore);
    }

    async update(isbn13: string, book: Book): Promise<Book> {
        if (!this.books.has(isbn13)) {
            throw new Error('Book not found.');
        }

        if (book.isbn13 !== isbn13 && this.books.has(book.isbn13)) {
            throw new Error('A book with this ISBN13 already exists.');
        }

        if (book.isbn13 !== isbn13) {
            this.books.delete(isbn13);
        }

        const toStore = this.clone(book);
        this.books.set(toStore.isbn13, toStore);

        return this.clone(toStore);
    }

    async delete(isbn13: string): Promise<void> {
        if (!this.books.has(isbn13)) {
            throw new Error('Book not found.');
        }

        this.books.delete(isbn13);
    }

    private clone(book: Book): Book {
        return { ...book };
    }
}