import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, Statement, Transaction } from '@prisma/client';
import { IStatementQuery } from './app.types';
import { PrismaService } from './prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emitter: EventEmitter2,
  ) {}

  async createTransaction(
    transaction: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    const newTransaction = await this.prismaService.transaction.create({
      data: {
        ...transaction,
      },
    });

    this.emitter.emit('transaction.created', newTransaction);

    return newTransaction;
  }

  async getTransactionss(query: IStatementQuery): Promise<Transaction[]> {
    return this.prismaService.transaction.findMany({
      where: { ...query },
      include: { statement: true },
    });
  }

  async getTransaction(id: string): Promise<Transaction> {
    return this.prismaService.transaction.findFirst({
      where: { id },
      include: { statement: true },
    });
  }
}
