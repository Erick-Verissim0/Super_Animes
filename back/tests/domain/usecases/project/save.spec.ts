import { mock, MockProxy } from 'jest-mock-extended';
import { SaveProject } from '@/domain/contracts/repos';
import { ProjectSave, setupProjectSave } from '@/domain/usecases/project';
import { mockProjectAdd, mockSaveProject } from '@/tests/domain/mocks';
import { throwError, throwQueryError } from '@/tests/test-helpers';
import { QueryError } from '@/application/errors';

describe('SaveProject', () => {
  let projectRepo: MockProxy<SaveProject>;
  let sut: ProjectSave;

  beforeAll(() => {
    projectRepo = mock();
    projectRepo.save.mockResolvedValue(mockSaveProject());
  });

  beforeEach(() => {
    sut = setupProjectSave(projectRepo);
  });

  it('should call SaveProject with correct input', async () => {
    const project = await sut(mockProjectAdd());
    expect(project).toHaveProperty('id');
    expect(project).toHaveProperty('id_user');
    expect(project).toHaveProperty('id_organization');
    expect(project).toHaveProperty('nm_project');
  });

  it('should throw QueryError if projectRepo save fails', async () => {
    projectRepo.save.mockRejectedValueOnce(() => throwQueryError());
    const promise = sut(mockProjectAdd());
    await expect(promise).rejects.toThrow(new QueryError('any_message'));
  });

  it('should rethrow if projectRepo save throw', async () => {
    projectRepo.save.mockRejectedValueOnce(() => throwError());
    const promise = sut(mockProjectAdd());
    await expect(promise).rejects.toThrow(new Error('any_message'));
  });
});
