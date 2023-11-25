import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ProjectDeleteParam {
  @ApiProperty()
  @IsUUID()
  id: string;
}
