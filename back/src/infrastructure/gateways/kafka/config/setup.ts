import { Injectable } from '@nestjs/common';
import { ClientProvider, ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';

const groupId = process.env.NODE_ENV === 'local' ? process.env.KAFKA_GROUP_ID + Math.random() : process.env.KAFKA_GROUP_ID;

@Injectable()
export class ConfigKafka implements ClientsModuleOptionsFactory {
  async createClientOptions(): Promise<ClientProvider> {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: process.env.KAFKA_CLIENT_ID,
          brokers: [process.env.KAFKA_BROKERS],
        },
        consumer: {
          groupId,
        },
        subscribe: { fromBeginning: true },
      },
    };
  }
}
