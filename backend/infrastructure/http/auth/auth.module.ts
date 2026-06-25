import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import type { StringValue } from 'ms';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from '../../../config/jwt.config';

import { InMemoryUserRepository } from '../../repositories/in-memory-user.repository';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../../../application/use-cases/login-user.use-case';
import { AuthenticateUserUseCase } from '../../../application/use-cases/authenticate-user.use-case';
import { GetAnalyticsMetricsUseCase } from '../../../application/use-cases/get-analytics-metrics.use-case';

// If you already export BOOK_REPOSITORY from BooksModule/tokens, use that instead.
import { InMemoryBookRepository } from '../../repositories/in-memory-book.repository';

const USER_REPOSITORY = Symbol('USER_REPOSITORY');
const BOOK_REPOSITORY = Symbol('BOOK_REPOSITORY');

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn as StringValue },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,

    { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
    { provide: BOOK_REPOSITORY, useClass: InMemoryBookRepository },

    {
      provide: RegisterUserUseCase,
      useFactory: (userRepo: InMemoryUserRepository) => new RegisterUserUseCase(userRepo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepo: InMemoryUserRepository) => new LoginUserUseCase(userRepo),
      inject: [USER_REPOSITORY],
    },
    AuthenticateUserUseCase,
    {
      provide: GetAnalyticsMetricsUseCase,
      useFactory: (bookRepo: InMemoryBookRepository) => new GetAnalyticsMetricsUseCase(bookRepo),
      inject: [BOOK_REPOSITORY],
    },
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}