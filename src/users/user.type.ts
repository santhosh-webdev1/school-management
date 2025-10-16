export enum UserRole {
  ADMIN = 'Admin',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
}

export interface UserDomain {
  id: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  isActive: boolean;
  passwordSet: boolean;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  emailVerified: boolean;
  verificationToken?: string | null;
  verificationTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
