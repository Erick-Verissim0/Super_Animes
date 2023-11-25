import { mock, MockProxy } from 'jest-mock-extended';
import { LoadAllProject } from '@/domain/contracts/repos';
import { ProjectLoadAll, setupProjectLoadAll } from '@/domain/usecases/project';
import { mockProjectRepo } from '@/tests/domain/mocks';
import { throwQueryError } from '@/tests/test-helpers';
import { QueryError } from '@/application/errors';
import { Pagination } from '@/domain/contracts/gateways';
import { ProjectM } from '@/domain/entities';

describe('ProjectLoadAll', () => {
  const options: Pagination.Options = { RestMode: Pagination.RestMode['paginate'], RestLimit: 10, RestPage: 1 };
  let projectRepo: MockProxy<LoadAllProject>;
  let sut: ProjectLoadAll;

  beforeAll(() => {
    projectRepo = mock();
    projectRepo.loadAll.mockImplementation(mockProjectRepo.loadAll);
  });

  beforeEach(() => {
    sut = setupProjectLoadAll(projectRepo);
  });

  it('should return array of ProjectM in mode of pagination', async () => {
    const projects = (await sut({ options })) as Pagination<ProjectM>;
    expect(projects.items).toHaveLength(4);
    expect(projects).toHaveProperty('meta');
    expect(projects.meta).toHaveProperty('itemCount');
    expect(projects.meta).toHaveProperty('totalItems');
    expect(projects.meta).toHaveProperty('itemsPerPage');
    expect(projects.meta).toHaveProperty('currentPage');
  });

  it('should return array of ProjectM in mode of list', async () => {
    options.RestMode = Pagination.RestMode.list;
    const projects = (await sut({ options })) as Array<ProjectM>;
    expect(projects).toHaveLength(4);
    expect(projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          id_user: expect.any(String),
          id_organization: expect.any(String),
          nm_project: expect.any(String),
          created_at: expect.any(Date),
          updated_at: expect.any(Date),
          deleted_at: expect.any(Date),
        }),
      ]),
    );
  });

  it('should throw QueryError if projectRepo loadAll fails', async () => {
    projectRepo.loadAll.mockRejectedValueOnce(() => throwQueryError());
    const promise = sut({ options });
    await expect(promise).rejects.toThrow(new QueryError('any_message'));
  });
});
