import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Producer } from 'kafkajs';
import * as crypto from 'node:crypto';
import { lastValueFrom } from 'rxjs';
import { SendTopic, SendTopicFile, StorageResponse } from '@/domain/contracts/gateways';
import { LoggerService } from '../../logger/logger.service';
import { logs } from '../helpers/';

@Injectable()
export class KafkaTopics implements OnModuleInit, SendTopic, SendTopicFile {
  constructor(
    @Inject(process.env.KAFKA_NAME_REGISTER)
    private readonly client: ClientKafka,
    private readonly logger: LoggerService,
  ) {}
  private kafka: Producer;

  async onModuleInit() {
    this.client.subscribeToResponseOf(process.env.TOPIC_STORE_SYNC_SEND_FILE);
    this.kafka = await this.client.connect();
  }

  async sendTopic({ key: uniqueId, topic, message }: SendTopic.Params): Promise<SendTopic.Result> {
    const key = uniqueId ? uniqueId : `PLANNING-${crypto.randomUUID()}`;
    const sends = await this.kafka.send({
      topic,
      messages: [{ key, value: JSON.stringify(message) }],
    });
    for (const send of sends) {
      this.logger.log(
        'KafkaService',
        `\x1b[36m New event on topic: {${send.topicName}} BaseOffset: "${send.baseOffset}" | Partition: "${send.partition}"\x1b[0m`,
      );
    }
  }

  async sendFile(data: SendTopicFile.Params): Promise<SendTopicFile.Result> {
    logs(this.logger).waiting();
    const response: { data: StorageResponse | StorageResponse[] } = await lastValueFrom(
      this.client.send(process.env.TOPIC_STORE_SYNC_SEND_FILE, JSON.stringify(data.message)).pipe(),
    );

    if (Array.isArray(data.message.files)) {
      const result: StorageResponse[] = [];
      for (let index = 0; data.message.files.length > index; index++) {
        const file = response.data[index] as StorageResponse;
        logs(this.logger).complet(file.id);
        result.push({ id: file.id, url: file.url, field_name: file.field_name });
      }
      return result;
    }
    const result = response as unknown as { data: StorageResponse };
    logs(this.logger).complet(result.data.id);
    return { id: result.data.id, url: result.data.url, field_name: result.data.field_name };
  }
}
