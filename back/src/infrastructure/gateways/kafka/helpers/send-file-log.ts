import { LoggerService } from '../../logger/logger.service';
import * as fs from 'fs';
export const logs = (logger: LoggerService) => {
  function complet(id: string) {
    logger.log(
      'KafkaTopics',
      `\x1b[36m Event on topic: {${process.env.TOPIC_STORE_SYNC_SEND_FILE}} Completed | File Uploaded | ID: ${id}"\x1b[0m`,
    );
  }
  function removed(fildName: string, path: string) {
    fs.unlinkSync(path);
    logger.log('KafkaTopics', `\x1b[36m Removed file in the folder temp | "${fildName}"\x1b[0m`);
  }
  function waiting() {
    logger.log('KafkaTopics', `\x1b[36m New event on topic: {${process.env.TOPIC_STORE_SYNC_SEND_FILE}} | Waiting..."\x1b[0m`);
  }
  return { complet, removed, waiting };
};
