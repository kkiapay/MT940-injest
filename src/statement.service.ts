import { Injectable } from '@nestjs/common';
import { Prisma, Statement } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class StatementService {
  constructor(private readonly prismaService: PrismaService) {}

  async createStatement(
    statement: Prisma.StatementCreateInput,
  ): Promise<Statement> {
    return this.prismaService.statement.create({
      data: {
        ...statement,
        transactions: {
          createMany: {
            data: statement.transactions as Prisma.Enumerable<Prisma.TransactionCreateManyStatementInput>,
            skipDuplicates: true,
          },
        },
      },
    });
  }

  async getStatements(): Promise<Statement[]> {
    return this.prismaService.statement.findMany({
      include: { transactions: true },
    });
  }

  async createStatements(
    statements: Prisma.StatementCreateInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.prismaService.statement.createMany({
      data: statements,
      skipDuplicates: true,
    });
  }
}
