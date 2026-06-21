export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'PRODUCTION-VALUE',
    expiresIn: '24h' as const,
} as const;