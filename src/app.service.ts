import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma, Statement, Transaction } from '@prisma/client';
import { StatementService } from './statement.service';
import { mt940Parser } from './utils';
import { splitCbUrls } from './utils/splitCbUrls';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);

  constructor(
    private readonly statementService: StatementService,
    private readonly http: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  @OnEvent('file-added')
  async handleAddFile(data: { path: string; content: string }) {
    try {
      this.logger.debug('File added: ' + data.content);

      for (const statement of await mt940Parser(data.path)) {
        await this.statementService.createStatement(
          statement as Prisma.StatementCreateInput,
        );
        this.logger.debug('parsing completed ' + JSON.stringify(statement));
      }

      this.logger.debug('statements created');
    } catch (error) {
      this.logger.error(error);
    }
  }

  @OnEvent('transaction-created')
  async handleTransactionCreation(data: Transaction) {
    try {
      const cbUrls = splitCbUrls();
      const promises = cbUrls.map((url: string) =>
        this.http.axiosRef.post(url, { transaction: data }),
      );
      await Promise.all(promises);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @OnEvent('statement-created')
  async handleStatementCreation(data: Statement) {
    this.logger.debug('statement called');
    try {
      const cbUrls = splitCbUrls();
      const promises = cbUrls.map((url: string) =>
        this.http.axiosRef.post(url, { statement: data }),
      );
      await Promise.all(promises);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
