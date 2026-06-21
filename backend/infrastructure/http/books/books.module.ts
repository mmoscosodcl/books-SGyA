import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BookService } from '../../../domain/services/book.service';
import { InMemoryBookRepository } from '../../repositories/in-memory-book.repository';
import { BOOK_REPOSITORY } from './tokens';

@Module({
  controllers: [BooksController],
  providers: [
    { provide: BOOK_REPOSITORY, useClass: InMemoryBookRepository },
    {
      provide: BookService,
      useFactory: (repo: InMemoryBookRepository) => new BookService(repo),
      inject: [BOOK_REPOSITORY],
    },
  ],
  exports: [BOOK_REPOSITORY],
})
export class BooksModule {}