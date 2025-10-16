// src/user/errors/user.error.ts
export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists');
  }
}

export class InvalidResetTokenError extends Error {
  constructor() {
    super('Invalid or expired password reset token');
  }
}
