import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { StatementService } from './statement.service';
import { mt940Parser } from './utils';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);

  constructor(private readonly statementService: StatementService) {}

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
}
