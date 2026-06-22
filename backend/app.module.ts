import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './infrastructure/http/books/books.module';
import { AuthModule } from './infrastructure/http/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // local dev fallback only:
      envFilePath: '.env',
      // in container, injected env vars override this
    }),
    BooksModule,
    AuthModule,
  ],
})
export class AppModule {}