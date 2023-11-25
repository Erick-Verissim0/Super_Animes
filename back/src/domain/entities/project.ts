import * as crypto from 'node:crypto';

type ProjectProps = Partial<ProjectM>;
export class ProjectM {
  id: string;
  id_user: string;
  id_organization: string;
  nm_project: string;
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(input: ProjectProps) {
    this.id = input.id ? input.id : crypto.randomUUID();
    this.id_user = input.id_user;
    this.id_organization = input.id_organization;
    this.nm_project = input.nm_project;
    this.created_by = input.created_by;
  }
}

export namespace ProjectM {
  export type Add = Omit<ProjectM, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
  export type Update = Partial<Add> & { id: string };
}
