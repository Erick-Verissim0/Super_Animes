import { ProjectDelete, ProjectLoadAll, ProjectSave, ProjectUpdate } from '@/domain/usecases/project';
import { ApiResponseType } from '@/main/common/decorators/swagger';
import { ProjectLoadAllPaginationPresenter, ProjectLoadAllPresenter, ProjectSavePresenter, ProjectUpdatePresenter } from '@/main/docs';
import { ProjectFactoryModule } from '@/main/factories/usecases/project.factory.module';
import { paginationOptions } from '@/main/helpers/controllers';
import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Inject, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiExtraModels, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ProjectDeleteParam, ProjectLoadAllHeader, ProjectSaveBody, ProjectUpdateBody, ProjectUpdateParam } from './dto';

@ApiTags('projects')
@ApiBearerAuth()
@ApiExtraModels(ProjectLoadAllPaginationPresenter, ProjectLoadAllPresenter, ProjectSavePresenter, ProjectUpdatePresenter)
@ApiBadRequestResponse({ description: 'Bad request' })
@Controller('projects')
export class ProjectController {
  constructor(
    @Inject(ProjectFactoryModule.SAVE_PROJECT_USECASE)
    private readonly projectSave: ProjectSave,
    @Inject(ProjectFactoryModule.UPDATE_PROJECT_USECASE)
    private readonly projectUpdate: ProjectUpdate,
    @Inject(ProjectFactoryModule.LOAD_ALL_PROJECT_USECASE)
    private readonly projectLoadAll: ProjectLoadAll,
    @Inject(ProjectFactoryModule.DELETE_PROJECT_USECASE)
    private readonly projectDelete: ProjectDelete,
  ) {}
  @ApiResponseType(ProjectSavePresenter, { httpStatus: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async save(@Req() request: Request, @Body() body: ProjectSaveBody) {
    return await this.projectSave({
      id_organization: request.user.organization.id,
      id_user: request.user.id,
      created_by: request.user.nm_user,
      ...body,
    });
  }

  @ApiResponseType(ProjectUpdatePresenter, { httpStatus: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param() param: ProjectUpdateParam, @Body() body: ProjectUpdateBody) {
    return await this.projectUpdate({ id: param.id, ...body });
  }

  @ApiResponseType(ProjectLoadAllPaginationPresenter, { httpStatus: HttpStatus.PARTIAL_CONTENT, description: 'rest_mode: "paginate"' })
  @ApiResponseType(ProjectLoadAllPresenter, { httpStatus: HttpStatus.OK, isArray: true, description: 'rest_mode: "list"' })
  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Get()
  async loadAll(@Headers() headers: ProjectLoadAllHeader) {
    const options = paginationOptions(headers);
    return await this.projectLoadAll({ options });
  }

  @ApiNoContentResponse({ description: 'No content' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() param: ProjectDeleteParam) {
    return await this.projectDelete({ id: param.id });
  }
}
