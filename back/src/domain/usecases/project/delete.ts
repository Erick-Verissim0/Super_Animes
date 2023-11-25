import { RequiredFieldError } from '@/application/errors';
import { DeleteProject } from '@/domain/contracts/repos';

type Setup = (projectRepo: DeleteProject) => ProjectDelete;
type Input = { id: string };
type Output = void;

export type ProjectDelete = (input: Input) => Promise<Output>;

export const setupProjectDelete: Setup = (projectRepo) => async (input) => {
  if (!input.id) throw new RequiredFieldError('id');
  await projectRepo.delete({ id: input.id });
};
