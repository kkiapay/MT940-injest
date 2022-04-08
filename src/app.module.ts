import { HttpModule } from '@nestjs/axios';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { StatementService } from './statement.service';
import { TransactionService } from './transaction.service';
import { WatcherService } from './watcher.service';

@Module({
  imports: [EventEmitterModule.forRoot(), ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    WatcherService,
    StatementService,
    TransactionService,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly watcherService: WatcherService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.watcherService.run(
      this.configService.get<string>('PATH_TO_FOLDER') || __dirname + '/utils',
      new RegExp(
        this.configService.get<string>('FILE_REGEX_PATTERN') || 'mt940.txt',
        this.configService.get('FILE_REGEX_FLAG') || 'g',
      ),
    );
  }
}
