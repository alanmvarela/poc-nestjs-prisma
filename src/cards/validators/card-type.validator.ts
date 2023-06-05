import { createParamDecorator, BadRequestException, ExecutionContext } from '@nestjs/common';
import { CardType } from '../cards.enum';

export const ValidateCardType = createParamDecorator((data, ctx: ExecutionContext) => { 
  const request = ctx.switchToHttp().getRequest();
  const type: CardType = request.params.type

  if (!Object.values(CardType).includes(type)) {
    throw new BadRequestException('Invalid card type');
  }

  return type;
});