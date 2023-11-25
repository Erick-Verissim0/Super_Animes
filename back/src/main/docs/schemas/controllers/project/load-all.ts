import { ApiProperty } from '@nestjs/swagger';
import { _PaginationPresenter } from '../../../components';
import { ProjectSchemaEntity } from '../../entities';

export class ProjectLoadAllPresenter extends ProjectSchemaEntity {}
export class ProjectLoadAllPaginationPresenter extends _PaginationPresenter {
  @ApiProperty({ type: ProjectLoadAllPresenter, isArray: true })
  items: Array<ProjectLoadAllPresenter>;
}
