import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/iuserrepository';
import {
    hashPassword,
    validateEmail,
    validatePassword,
    createUserEntity,
} from '../../domain/services/auth-rules';
import { User } from '../../domain/models/user';

export interface RegisterInput {
    email: string;
    password: string;
}

@Injectable()
export class RegisterUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(input: RegisterInput): Promise<User> {
        validateEmail(input.email);
        validatePassword(input.password);

        const existing = await this.userRepository.findByEmail(input.email);
        if (existing) {
            throw new Error('User with this email already exists.');
        }

        const passwordHash = await hashPassword(input.password);
        const user = createUserEntity(input.email, passwordHash);

        return this.userRepository.create(user);
    }
}