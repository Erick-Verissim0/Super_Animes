import { setupNumberType } from '@/application/contracts/gateways';
import { Pagination } from '@/domain/contracts/gateways';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
type Input = {
  'rest-mode': string;
  'rest-page': string;
  'rest-limit': string;
};
export function paginationOptions(input: Input) {
  const RestPage = input['rest-page'] ? Number(setupNumberType(input['rest-page'])) : 1;
  const RestLimit = input['rest-limit'] ? Number(setupNumberType(input['rest-limit'])) : 10;
  const RestMode: Pagination.RestMode = input['rest-mode'] ? Pagination.RestMode[input['rest-mode']] : 'paginate';
  const options = {
    RestPage,
    RestLimit,
    RestMode,
  };
  return options;
}

export class PaginationHeaderOptions {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  'rest-mode': string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  'rest-page': string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  'rest-limit': string;
}
