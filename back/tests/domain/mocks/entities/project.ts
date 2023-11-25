import * as faker from '@faker-js/faker';
import { ProjectM } from '@/domain/entities';

export const mockProjectAdd = (): ProjectM.Add => ({
  id_organization: faker.faker.datatype.uuid(),
  id_user: faker.faker.datatype.uuid(),
  nm_project: faker.faker.company.bsBuzz(),
  created_by: faker.faker.datatype.string(),
});

export const mockProject = (deleted_at = new Date()): ProjectM => ({
  id: faker.faker.datatype.uuid(),
  ...mockProjectAdd(),
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at,
});
