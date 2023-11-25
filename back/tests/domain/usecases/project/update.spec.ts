import { UpdateProject } from '@/domain/contracts/repos';
import { ProjectUpdate, setupProjectUpdate } from '@/domain/usecases/project';
import { mock, MockProxy } from 'jest-mock-extended';
import { mockProject } from '@/tests/domain/mocks';
import { QueryError, RequiredFieldError } from '@/application/errors';
import { throwQueryError } from '@/tests/test-helpers';

describe('ProjectUpdate', () => {
  let projectRepo: MockProxy<UpdateProject>;
  let sut: ProjectUpdate;

  beforeAll(() => {
    projectRepo = mock();
    projectRepo.update.mockResolvedValue(mockProject());
  });

  beforeEach(() => {
    sut = setupProjectUpdate(projectRepo);
  });

  it('should call ProjectUpdate with correct input', async () => {
    const project = await sut({ id: 'any_id', nm_project: 'any_nm_project' });
    expect(project).toHaveProperty('id');
    expect(project).toHaveProperty('nm_project');
  });

  it('should throw RequiredFieldError if missing id', async () => {
    const project = sut({ nm_project: 'any_nm_project' } as any);
    expect(project).rejects.toThrow(new RequiredFieldError('id'));
  });

  it('should throw QueryError if projectRepo update fails', async () => {
    projectRepo.update.mockRejectedValueOnce(() => throwQueryError());
    const promise = sut({ id: 'any_id', nm_project: 'any_nm_project' });
    await expect(promise).rejects.toThrow(new QueryError('any_message'));
  });
});
