// src/user/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { User } from 'src/users/entities/user.entity';
import { TransactionHelper } from '../helper';
import { UserNotFoundError } from 'src/users/user.error';
import { UserMapper } from '../mapper/user.mapper';
import { UserDomain } from 'src/users/user.type';


@Injectable()
export class UserRepository extends BaseRepository<User> {
  protected model = User;

  constructor(
    dataSource: DataSource,
    transactionHelper: TransactionHelper,
  ) {
    super(dataSource, transactionHelper);
  }

  async findByEmail(email: string): Promise<UserDomain> {
    const repo = this.getDBRepository();
    const user = await repo.findOne({ where: { email } });
    if (!user) throw new UserNotFoundError();
    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<UserDomain> {
    const repo = this.getDBRepository();
    const user = await repo.findOne({ where: { id } });
    if (!user) throw new UserNotFoundError();
    return UserMapper.toDomain(user);
  }

  async saveDomain(domain: UserDomain): Promise<UserDomain> {
    const repo = this.getDBRepository();
    const entity = UserMapper.toPersistence(domain);
    const saved = await repo.save(entity);
    return UserMapper.toDomain(saved);
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<void> {
    await this.getDBRepository().update(id, updateData);
  }
}
