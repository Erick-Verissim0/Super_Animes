import { Pagination } from '@/domain/contracts/gateways';
import { LoadAllProject } from '@/domain/contracts/repos';
import { ProjectM } from '@/domain/entities';

type Setup = (projectRepo: LoadAllProject) => ProjectLoadAll;
type Input = { options: Pagination.Options };
type Output = Pagination<ProjectM> | Array<ProjectM>;

export type ProjectLoadAll = (input: Input) => Promise<Output>;

export const setupProjectLoadAll: Setup = (projectRepo) => async (input) => {
  return projectRepo.loadAll(input);
};
