import { mock, MockProxy } from 'jest-mock-extended';
import { DeleteProject } from '@/domain/contracts/repos';
import { ProjectDelete, setupProjectDelete } from '@/domain/usecases/project';
import { throwQueryError } from '@/tests/test-helpers';
import { QueryError, RequiredFieldError } from '@/application/errors';

describe('ProjectDelete', () => {
  let projectRepo: MockProxy<DeleteProject>;
  let sut: ProjectDelete;

  beforeAll(() => {
    projectRepo = mock();
  });

  beforeEach(() => {
    sut = setupProjectDelete(projectRepo);
  });

  it('should call ProjectDelete repository with correct input', async () => {
    await sut({ id: 'any_id' });
    expect(projectRepo.delete).toBeCalledWith({ id: 'any_id' });
    expect(projectRepo.delete).toBeCalledTimes(1);
  });

  it('should throw QueryError if ProjectDelete fails', async () => {
    projectRepo.delete.mockRejectedValueOnce(() => throwQueryError());
    const promise = sut({ id: 'any_id' });
    await expect(promise).rejects.toThrow(new QueryError('any_message'));
  });

  it('should throw RequiredFieldError if missing id', async () => {
    const promise = sut({} as any);
    await expect(promise).rejects.toThrow(new RequiredFieldError('id'));
  });
});
