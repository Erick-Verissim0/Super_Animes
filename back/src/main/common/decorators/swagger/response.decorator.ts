import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseType = <TModel extends Type<any>>(
  model: TModel,
  data?: { httpStatus?: number; isArray?: boolean; description?: string },
) => {
  return applyDecorators(
    ApiResponse({
      description: data?.description && data?.description,
      isArray: data?.isArray ? data.isArray : false,
      status: data?.httpStatus ? data.httpStatus : HttpStatus.OK,
      type: model,
      schema: {
        allOf: [{ $ref: getSchemaPath(model) }],
      },
    }),
  );
};
