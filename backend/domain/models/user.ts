export interface User {
    id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
}

export interface UserPayload {
    id: string;
    email: string;
}