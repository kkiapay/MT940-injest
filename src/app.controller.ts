import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';
import { IStatementQuery, ITransactionQuery } from './app.types';
import { StatementService } from './statement.service';
import { TransactionService } from './transaction.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly statementService: StatementService,
    private readonly transactionService: TransactionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/statements')
  async getStatements(@Query() query: IStatementQuery = {}): Promise<any> {
    return await this.statementService.getStatements(query);
  }

  @Get('/statements/:id')
  async getStatement(@Param('id') id: string): Promise<any> {
    return await this.statementService.getStatement(id);
  }

  @Post('/statements')
  async createStatement(
    @Body() body: Prisma.StatementCreateInput | Prisma.StatementCreateInput[],
  ): Promise<any> {
    if (Array.isArray(body))
      return await this.statementService.createStatements(body);
    return await this.statementService.createStatement(body);
  }

  @Get('/transactions')
  async getTransactions(@Query() query: ITransactionQuery = {}): Promise<any> {
    return await this.transactionService.getTransactionss(query);
  }

  @Get('/transactions/:id')
  async getTransaction(@Param('id') id: string): Promise<any> {
    return await this.transactionService.getTransaction(id);
  }

  @Post('/transactions')
  async createTransaction(
    @Body() body: Prisma.TransactionCreateInput,
  ): Promise<any> {
    return await this.transactionService.createTransaction(body);
  }
}
