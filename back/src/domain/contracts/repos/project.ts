import { ProjectM } from '@/domain/entities';
import { Pagination } from '../gateways';

export interface SaveProject {
  save: (input: SaveProject.Input) => Promise<SaveProject.Output>;
}

export namespace SaveProject {
  export type Input = ProjectM.Add;
  export type Output = ProjectM;
}

export interface UpdateProject {
  update: (input: UpdateProject.Input) => Promise<UpdateProject.Output>;
}

export namespace UpdateProject {
  export type Input = ProjectM.Update;
  export type Output = ProjectM;
}

export interface DeleteProject {
  delete: (input: DeleteProject.Input) => Promise<DeleteProject.Output>;
}

export namespace DeleteProject {
  export type Input = { id: string };
  export type Output = void;
}

export interface LoadAllProject {
  loadAll: (input: LoadAllProject.Input) => Promise<LoadAllProject.Output>;
}

export namespace LoadAllProject {
  export type Input = { options: Pagination.Options };
  export type Output = Pagination<ProjectM> | Array<ProjectM>;
}
