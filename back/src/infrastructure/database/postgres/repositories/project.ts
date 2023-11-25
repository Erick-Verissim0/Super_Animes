import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { DeleteProject, LoadAllProject, SaveProject, UpdateProject } from '@/domain/contracts/repos';
import { QueryError } from '@/application/errors';
import { LoggerService } from '@/infrastructure/gateways/logger/logger.service';
import { PgProject } from '../entities';

@Injectable()
export class PgProjectRepository implements SaveProject, UpdateProject, LoadAllProject, DeleteProject {
  constructor(
    @InjectRepository(PgProject)
    private readonly projectRepo: Repository<PgProject>,
    private readonly logger: LoggerService,
  ) {}

  async save(input: SaveProject.Input): Promise<SaveProject.Output> {
    try {
      const project = this.projectRepo.create(input);
      await this.projectRepo.save(project);
      return project;
    } catch (error) {
      throw new QueryError(error.message);
    }
  }

  async update(input: UpdateProject.Input): Promise<any> {
    if (!input.id) throw new QueryError('id is required');
    await this.projectRepo.findOneOrFail({ id: input.id }).catch(() => {
      throw new QueryError(`id: "${input.id}" | Project do not exists`);
    });
    const project = await this.projectRepo.save(input).catch((err) => {
      throw new QueryError(err.message);
    });
    return project;
  }

  async loadAll(input: LoadAllProject.Input): Promise<LoadAllProject.Output> {
    try {
      const projects = this.projectRepo.createQueryBuilder();
      if (input.options.RestMode === 'list') {
        return projects.getMany();
      }
      return paginate<PgProject>(projects, { limit: input.options.RestLimit, page: input.options.RestPage });
    } catch (err) {
      throw new QueryError(err.message);
    }
  }

  async delete(input: DeleteProject.Input): Promise<void> {
    if (!input.id) throw new QueryError('id is required');
    const deleted = await this.projectRepo
      .createQueryBuilder()
      .where('id = :id', { id: input.id })
      .softDelete()
      .execute()
      .catch((err) => {
        throw new QueryError(err.message);
      });
    if (deleted.affected > 0) {
      this.logger.log('PgProjectRepository', `id: "${input.id}" deleted successfully`);
    } else {
      this.logger.log('PgProjectRepository', `id: "${input.id}" not exists`);
    }
  }
}
