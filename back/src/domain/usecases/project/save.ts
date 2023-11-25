import { SaveProject } from '@/domain/contracts/repos';
import { ProjectM } from '@/domain/entities';

type Setup = (projectRepo: SaveProject) => ProjectSave;
type Input = ProjectM.Add;
type Output = Promise<ProjectM>;
export type ProjectSave = (input: Input) => Output;

export const setupProjectSave: Setup = (projectRepo) => async (input) => {
  const project = new ProjectM(input);
  const save = await projectRepo.save(project);
  return save;
};
