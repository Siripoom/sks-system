import { Role } from '@prisma/client';
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const generateTokens: (payload: {
    id: string;
    email: string;
    role: Role;
}) => {
    accessToken: never;
    refreshToken: never;
};
export declare const verifyRefreshToken: (token: string) => {
    id: string;
    email: string;
    role: Role;
};
//# sourceMappingURL=auth.d.ts.map