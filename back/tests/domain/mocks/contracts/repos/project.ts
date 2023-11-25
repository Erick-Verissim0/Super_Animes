import { LoadAllProject, SaveProject } from '@/domain/contracts/repos';
import { mockProject, mockProjectAdd } from '@/tests/domain/mocks/';

export const mockSaveProjectInput = (): SaveProject.Input => ({
  ...mockProjectAdd(),
});

export const mockSaveProject = (): SaveProject.Output => ({
  ...mockProject(),
});

export const mockProjectLoadAll = (): LoadAllProject.Output => [mockProject(), mockProject(), mockProject()];

export const mockProjectRepo: LoadAllProject = {
  async loadAll(input) {
    const projects = [mockProject(), mockProject(), mockProject(), mockProject()];

    if (input.options.RestMode === 'paginate') {
      return {
        items: projects,
        meta: {
          currentPage: 1,
          itemCount: projects.length,
          itemsPerPage: input.options.RestLimit,
          totalItems: projects.length,
          totalPages: 1,
        },
      };
    }

    return projects;
  },
};
