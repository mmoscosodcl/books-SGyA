import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserUseCase } from './login-user.use-case';

export interface AuthenticateInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: AuthenticateInput) {
    const user = await this.loginUserUseCase.execute(input);
    const payload = { id: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}