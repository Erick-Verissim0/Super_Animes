import { TypeOrmConfigModule } from '@/main/config/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../gateways/logger/logger.module';

// ENTITIES
import { PgProject } from './postgres/entities';

// REPOSITORIES
import { PgProjectRepository } from './postgres/repositories';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([PgProject]), LoggerModule],
  providers: [PgProjectRepository],
  exports: [PgProjectRepository],
})
export class PostgresModule {}
