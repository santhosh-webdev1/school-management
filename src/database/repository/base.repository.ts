// src/shared/repository/base.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { TransactionHelper } from '../helper';

@Injectable()
export class BaseRepository<T extends object> {
  protected model: { new (): T };

  constructor(
    private readonly dataSource: DataSource,
    private readonly transactionHelper: TransactionHelper,
  ) {}

  getDBRepository(): Repository<T> {
    const repository = this.dataSource.getRepository<T>(this.model);
    if (this.transactionHelper.isInTransaction() && this.transactionHelper.manager) {
      return this.transactionHelper.manager.withRepository(repository);
    }
    return repository;
  }

  async startQueryRunner(cb: (queryRunner: QueryRunner) => Promise<void>) {
    const queryRunner =
      this.transactionHelper.queryRunner || this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await cb(queryRunner);
    } finally {
      await queryRunner.release();
    }
  }
}
