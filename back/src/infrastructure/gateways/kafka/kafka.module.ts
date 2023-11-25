import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { LoggerModule } from '../logger/logger.module';
import { ConfigKafka } from './config';
import { KafkaTopics } from './implementations';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: process.env.KAFKA_NAME_REGISTER,
        useClass: ConfigKafka,
      },
    ]),
    LoggerModule,
  ],
  providers: [KafkaTopics],
  exports: [KafkaTopics],
})
export class KafkaModule {}
