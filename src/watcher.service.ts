import * as chokidar from 'chokidar';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as fs from 'fs';

@Injectable()
export class WatcherService {
  private logger: Logger = new Logger(WatcherService.name);
  constructor(private eventEmitter: EventEmitter2) {}

  async run(folder: string, regex: RegExp) {
    try {
      this.logger.debug(`Watching for ${folder}`);

      chokidar.watch(folder, { persistent: true }).on('add', async (path) => {
        console.log(`File ${regex}`);
        if (path.match(regex)) {
          this.logger.debug(`${path} has been added.`);

          // Read content of the new file
          const content = fs.readFileSync(path);

          if (content) {
            this.eventEmitter.emit('file-added', {
              path,
              content: content.toString(),
            });
          }
        }
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
