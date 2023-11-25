import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProjectSaveBody {
  @ApiProperty()
  @IsString()
  nm_project: string;
}
