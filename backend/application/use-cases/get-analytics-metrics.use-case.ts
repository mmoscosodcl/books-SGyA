import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../../domain/repositories/ibookrepository';
import { calculateBookStatus } from '../../domain/services/book-rules';
import { Book } from '../../domain/models/book';

export interface AnalyticsMetrics {
    totalBooks: number;
    booksByFormat: { [key: string]: number };
    booksByStatus: { [key: string]: number };
    averagePrice: number;
    totalStock: number;

    // NEW
    inventoryValue: number;                 // sum(precio * stock)
    booksByCategory: { [key: string]: number };
    stockByBindingType: { [key: string]: number }; 
    worksByAgeBins: { [key: string]: number };

}

@Injectable()
export class GetAnalyticsMetricsUseCase {
    constructor(private readonly bookRepository: IBookRepository) {}

    private getAgeBinLabel(age: number): string {
        if (age <= 5) return '0-5';
        if (age <= 10) return '6-10';
        if (age <= 20) return '11-20';
        return '21+';
    }

    async execute(): Promise<AnalyticsMetrics> {
        const books = await this.bookRepository.list();

        if (books.length === 0) {
            return {
                totalBooks: 0,
                booksByFormat: {},
                booksByStatus: {},
                averagePrice: 0,
                totalStock: 0,
                inventoryValue: 0,
                booksByCategory: {},
                stockByBindingType: {},
                worksByAgeBins: {},
            };
        }

        const booksByFormat: { [key: string]: number } = {};
        const booksByStatus: { [key: string]: number } = {};
        const booksByCategory: { [key: string]: number } = {};
        const stockByFormat: { [key: string]: number } = {};
        const stockByBindingType: { [key: string]: number } = { 'Tapa Dura': 0, 'Tapa Blanda': 0 };
        const worksByAgeBins: { [key: string]: number } = {};

        let totalPrice = 0;
        let totalStock = 0;
        let inventoryValue = 0;

        const currentYear = new Date().getFullYear();

        books.forEach((book: Book) => {
            // Existing metrics
            booksByFormat[book.formato] = (booksByFormat[book.formato] || 0) + 1;
            const status = calculateBookStatus(book);
            booksByStatus[status] = (booksByStatus[status] || 0) + 1;
            totalPrice += book.precio;
            totalStock += book.stock;

            // NEW metrics
            inventoryValue += book.precio * book.stock;

            const category = book.categoria ?? 'Sin categoría';
            booksByCategory[category] = (booksByCategory[category] || 0) + 1;

            if (book.formato === 'Papel' && book.bindingType) {
                stockByBindingType[book.bindingType] = (stockByBindingType[book.bindingType] || 0) + book.stock;
            }

            // Works by age bins (requires publication year/date in model)
            const publicationYear = book.publicationDate ? new Date(book.publicationDate).getFullYear() : null;
            if (!publicationYear || Number.isNaN(publicationYear)) {
                worksByAgeBins['Desconocida'] = (worksByAgeBins['Desconocida'] || 0) + 1;
            } else {
                const age = Math.max(0, currentYear - publicationYear);
                const bin = this.getAgeBinLabel(age);
                worksByAgeBins[bin] = (worksByAgeBins[bin] || 0) + 1;
            }
        });

        return {
            totalBooks: books.length,
            booksByFormat,
            booksByStatus,
            averagePrice: totalPrice / books.length,
            totalStock,

            // NEW
            inventoryValue,
            booksByCategory,
            stockByBindingType,
            worksByAgeBins,
        };
    }
}