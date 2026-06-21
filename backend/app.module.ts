import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { BooksModule } from './infrastructure/http/books/books.module';
import { AuthModule } from './infrastructure/http/auth/auth.module';

@Module({
  imports: [BooksModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}