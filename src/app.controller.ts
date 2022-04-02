import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StatementService } from './statement.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly statementService: StatementService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/statements')
  async getStatements(): Promise<any> {
    return await this.statementService.getStatements();
  }
}
