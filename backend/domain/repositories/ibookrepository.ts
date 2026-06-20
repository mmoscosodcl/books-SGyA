import { Book } from '../../domain/models/book';

export interface IBookRepository {
    findByIsbn13(isbn13: string): Promise<Book | null>;
    list(): Promise<Book[]>;
    create(book: Book): Promise<Book>;
    update(isbn13: string, book: Book): Promise<Book>;
    delete(isbn13: string): Promise<void>;
}