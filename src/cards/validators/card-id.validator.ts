import { createParamDecorator, BadRequestException, ExecutionContext } from '@nestjs/common';

export const ValidateId = createParamDecorator((data, ctx: ExecutionContext) => { 
  const request = ctx.switchToHttp().getRequest();
  const id = request.params.id

  // Validates if id is a number
  if (isNaN(id)) {
    throw new BadRequestException('Invalid id');
  }

  return id;
});