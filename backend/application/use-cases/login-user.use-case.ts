import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/iuserrepository';
import { verifyPassword } from '../../domain/services/auth-rules';
import { User } from '../../domain/models/user';

export interface LoginInput {
    email: string;
    password: string;
}

@Injectable()
export class LoginUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(input: LoginInput): Promise<User> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new Error('Invalid credentials.');
        }

        const isValid = await verifyPassword(input.password, user.passwordHash);
        if (!isValid) {
            throw new Error('Invalid credentials.');
        }

        return user;
    }
}