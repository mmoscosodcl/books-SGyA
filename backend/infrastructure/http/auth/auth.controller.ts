import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.use-case';
import { GetAnalyticsMetricsUseCase } from '../../../application/use-cases/get-analytics-metrics.use-case';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthenticateUserUseCase } from '../../../application/use-cases/authenticate-user.use-case';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUserUseCase,
        private readonly authenticateUseCase: AuthenticateUserUseCase,
        private readonly analyticsUseCase: GetAnalyticsMetricsUseCase,
  ) {}

     @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    const user = await this.registerUseCase.execute(dto);
    return { id: user.id, email: user.email };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authenticateUseCase.execute(dto);
  }

  @Get('analytics')
  @UseGuards(JwtAuthGuard)
  async getAnalytics(@Request() _req: unknown) {
    return this.analyticsUseCase.execute();
  }
}