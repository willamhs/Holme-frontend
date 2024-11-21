export interface UserProfile {
    id: number;
    email: string;
    profilePicPath: string;
    role: 'CUSTOMER' | 'ADMIN' | null;
    firstName: string;
    lastName: string;
    occupation?: string;
}