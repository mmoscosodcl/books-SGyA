import * as bcrypt from 'bcrypt';
import { User } from '../models/user';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
    plainPassword: string,
    hash: string,
): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
}

export function validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format.');
    }
}

export function validatePassword(password: string): void {
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters.');
    }
}

export function createUserEntity(email: string, passwordHash: string): User {
    return {
        id: generateId(),
        email,
        passwordHash,
        createdAt: new Date(),
    };
}

function generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}