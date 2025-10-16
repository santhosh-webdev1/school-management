import { UserResponseDto } from "src/users/dto/user.dto";
import { User } from "src/users/entities/user.entity";
import { UserDomain, UserRole } from "src/users/user.type";


export class UserMapper {
  static toDomain(entity: User): UserDomain {
    return {
      id: entity.id,
      email: entity.email,
      passwordHash: entity.password,
      role: entity.role as UserRole,
      isActive: entity.isActive,
      passwordSet: entity.passwordSet,
      resetToken: entity.resetToken,
      resetTokenExpiry: entity.resetTokenExpiry,
      emailVerified: entity.emailVerified,
      verificationToken: entity.verificationToken,
      verificationTokenExpiry: entity.verificationTokenExpiry,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPersistence(domain: UserDomain): User {
    const entity = new User();
    entity.id = domain.id;
    entity.email = domain.email;
    entity.password = domain.passwordHash;
    entity.role = domain.role;
    entity.isActive = domain.isActive;
    entity.passwordSet = domain.passwordSet;
    entity.resetToken = domain.resetToken;
    entity.resetTokenExpiry = domain.resetTokenExpiry;
    entity.emailVerified = domain.emailVerified;
    entity.verificationToken = domain.verificationToken;
    entity.verificationTokenExpiry = domain.verificationTokenExpiry;
    return entity;
  }

  static toResponse(domain: UserDomain): UserResponseDto {
    return {
      id: domain.id,
      email: domain.email,
      role: domain.role,
      isActive: domain.isActive,
      emailVerified: domain.emailVerified,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
