import { hashFile } from 'src/utils/hash';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, Statement } from '@prisma/client';
import { IStatementQuery } from './app.types';
import { PrismaService } from './prisma.service';

@Injectable()
export class StatementService {
  private readonly logger: Logger = new Logger(StatementService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly emitter: EventEmitter2,
  ) {}

  async createStatement(
    statement: Prisma.StatementCreateInput,
  ): Promise<Statement> {
    const newStatement = await this.prismaService.statement.create({
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

    this.emitter.emit('statement-created', newStatement);
    this.logger.debug('emit: statement-created', newStatement);
    return newStatement;
  }

  async getStatements(query: IStatementQuery): Promise<Statement[]> {
    return this.prismaService.statement.findMany({
      where: { ...query },
      include: { transactions: true },
    });
  }

  async getStatement(id: string): Promise<Statement> {
    return this.prismaService.statement.findFirst({
      where: { id },
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

  async isExistingStatement(path: string) {
    const hash = hashFile(path);
    return !!(await this.prismaService.statement.findFirst({
      where: { fileHash: hash },
    }));
  }
}
