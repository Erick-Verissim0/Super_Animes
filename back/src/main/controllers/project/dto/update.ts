import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ProjectUpdateParam {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class ProjectUpdateBody {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nm_project?: string;
}
