import { RequiredFieldError } from '@/application/errors';
import { UpdateProject } from '@/domain/contracts/repos';
import { ProjectM } from '@/domain/entities';

type Setup = (projectRepo: UpdateProject) => ProjectUpdate;
type Input = ProjectM.Update;
type Output = Promise<ProjectM>;
export type ProjectUpdate = (input: Input) => Output;

export const setupProjectUpdate: Setup = (projectRepo) => async (input) => {
  if (!input.id) throw new RequiredFieldError('id');
  const project = new ProjectM(input);
  const save = await projectRepo.update(project);
  return save;
};
