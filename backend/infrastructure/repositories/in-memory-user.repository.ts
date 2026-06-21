import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user';
import { IUserRepository } from '../../domain/repositories/iuserrepository';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
    private readonly users: Map<string, User> = new Map();

    async findByEmail(email: string): Promise<User | null> {
        const user = Array.from(this.users.values()).find(
            (u) => u.email === email,
        );
        return user ? this.clone(user) : null;
    }

    async create(user: User): Promise<User> {
        if (await this.findByEmail(user.email)) {
            throw new Error('User with this email already exists.');
        }

        const toStore = this.clone(user);
        this.users.set(user.id, toStore);
        return this.clone(toStore);
    }

    private clone(user: User): User {
        return { ...user };
    }
}