import { ProjectM } from '@/domain/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectSchemaEntity implements ProjectM {
  @ApiProperty()
  id: string;
  @ApiProperty()
  id_user: string;
  @ApiProperty()
  id_organization: string;
  @ApiProperty()
  nm_project: string;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  created_at?: Date;
  @ApiProperty()
  updated_at?: Date;
  @ApiProperty()
  deleted_at?: Date;
}
