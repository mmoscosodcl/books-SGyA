import { Book, BookStatus, BOOK_FORMAT, BOOK_STATUS } from '../models/book';

const DIGITAL_FIXED_STOCK = 9999;
const DIGITAL_MAX_PRICE = 25.0;
const LOW_STOCK_THRESHOLD = 5;

export function calculateBookStatus(book: Book): BookStatus {
    if (book.discontinued) return BOOK_STATUS.DISCONTINUED;
    if (book.formato === BOOK_FORMAT.DIGITAL) return BOOK_STATUS.AVAILABLE;
    if (book.stock <= 0) return BOOK_STATUS.OUT_OF_STOCK;
    if (book.stock <= LOW_STOCK_THRESHOLD) return BOOK_STATUS.LOW_STOCK;
    return BOOK_STATUS.AVAILABLE;
}

export function normalizeBook(book: Book): Book {
    if (book.precio <= 0) {
        throw new Error('Invalid price: precio must be greater than 0.');
    }

    if (book.formato === BOOK_FORMAT.PAPEL && !book.bindingType) {
        throw new Error('Paper books must specify a bindingType (Tapa Dura or Tapa Blanda).');
    }

    if (book.formato === BOOK_FORMAT.DIGITAL) {
        return {
            ...book,
            stock: DIGITAL_FIXED_STOCK,
            precio: Math.min(book.precio, DIGITAL_MAX_PRICE),
            bindingType: undefined,
        };
    }

    return book;
}

export function assertBookMutable(book: Book): void {
    if (calculateBookStatus(book) === BOOK_STATUS.DISCONTINUED) {
        throw new Error('Operation blocked: Discontinued books cannot be modified or deleted.');
    }
}

export function assertBookDeletable(book: Book): void {
    assertBookMutable(book);
}

export function prepareBookForCreate(input: Book): Book {
    return normalizeBook({ ...input, discontinued: input.discontinued ?? false });
}

export function prepareBookForUpdate(current: Book, patch: Partial<Book>): Book {
    assertBookMutable(current);
    return normalizeBook({ ...current, ...patch });
}