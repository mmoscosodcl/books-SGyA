import { Module } from '@nestjs/common';
import { BooksModule } from './infrastructure/http/books/books.module';

@Module({
  imports: [BooksModule],
})
export class AppModule {}