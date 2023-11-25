import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
// import * as entities from '../../../infrastructure/database/postgres/entities',

export const getTypeOrmModuleOptions = (config: ConfigService): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    schema: config.get<string>('DB_SCHEMA'),
    synchronize: false,
    migrations: ['dist/database/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'database/migrations',
    },
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
