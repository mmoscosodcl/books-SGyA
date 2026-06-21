import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../../domain/repositories/ibookrepository';
import { calculateBookStatus } from '../../domain/services/book-rules';

export interface AnalyticsMetrics {
    totalBooks: number;
    booksByFormat: { [key: string]: number };
    booksByStatus: { [key: string]: number };
    averagePrice: number;
    totalStock: number;
}

@Injectable()
export class GetAnalyticsMetricsUseCase {
    constructor(private readonly bookRepository: IBookRepository) {}

    async execute(): Promise<AnalyticsMetrics> {
        const books = await this.bookRepository.list();

        if (books.length === 0) {
            return {
                totalBooks: 0,
                booksByFormat: {},
                booksByStatus: {},
                averagePrice: 0,
                totalStock: 0,
            };
        }

        const booksByFormat: { [key: string]: number } = {};
        const booksByStatus: { [key: string]: number } = {};
        let totalPrice = 0;
        let totalStock = 0;

        books.forEach((book) => {
            booksByFormat[book.formato] = (booksByFormat[book.formato] || 0) + 1;
            const status = calculateBookStatus(book);
            booksByStatus[status] = (booksByStatus[status] || 0) + 1;
            totalPrice += book.precio;
            totalStock += book.stock;
        });

        return {
            totalBooks: books.length,
            booksByFormat,
            booksByStatus,
            averagePrice: totalPrice / books.length,
            totalStock,
        };
    }
}