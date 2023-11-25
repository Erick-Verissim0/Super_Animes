import { DynamicModule, Module } from '@nestjs/common';
import { PostgresModule } from '@/infrastructure/database/postgres.module';
import { PgProjectRepository } from '@/infrastructure/database/postgres/repositories';
import { setupProjectDelete, setupProjectLoadAll, setupProjectSave, setupProjectUpdate } from '@/domain/usecases/project';

@Module({ imports: [PostgresModule] })
export class ProjectFactoryModule {
  static SAVE_PROJECT_USECASE = 'SAVE_PROJECT_USECASE';
  static UPDATE_PROJECT_USECASE = 'UPDATE_PROJECT_USECASE';
  static LOAD_ALL_PROJECT_USECASE = 'LOAD_ALL_PROJECT_USECASE';
  static DELETE_PROJECT_USECASE = 'DELETE_PROJECT_USECASE';

  static register(): DynamicModule {
    const exports = [
      ProjectFactoryModule.SAVE_PROJECT_USECASE,
      ProjectFactoryModule.UPDATE_PROJECT_USECASE,
      ProjectFactoryModule.LOAD_ALL_PROJECT_USECASE,
      ProjectFactoryModule.DELETE_PROJECT_USECASE,
    ];
    return {
      module: ProjectFactoryModule,
      providers: [
        {
          inject: [PgProjectRepository],
          provide: ProjectFactoryModule.SAVE_PROJECT_USECASE,
          useFactory: (projectRepo: PgProjectRepository) => setupProjectSave(projectRepo),
        },
        {
          inject: [PgProjectRepository],
          provide: ProjectFactoryModule.UPDATE_PROJECT_USECASE,
          useFactory: (projectRepo: PgProjectRepository) => setupProjectUpdate(projectRepo),
        },
        {
          inject: [PgProjectRepository],
          provide: ProjectFactoryModule.LOAD_ALL_PROJECT_USECASE,
          useFactory: (projectRepo: PgProjectRepository) => setupProjectLoadAll(projectRepo),
        },
        {
          inject: [PgProjectRepository],
          provide: ProjectFactoryModule.DELETE_PROJECT_USECASE,
          useFactory: (projectRepo: PgProjectRepository) => setupProjectDelete(projectRepo),
        },
      ],
      exports,
    };
  }
}
