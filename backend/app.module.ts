import { Module } from '@nestjs/common';
import { BooksModule } from './infrastructure/http/books/books.module';
import { AuthModule } from './infrastructure/http/auth/auth.module';

@Module({
  imports: [BooksModule, AuthModule],
})
export class AppModule {}