import { Controller, Post, Get, Delete, Body, Param, Patch } from '@nestjs/common';
import { CreateCardDto } from './dtos/create-card.dto';
import { CardsService } from './cards.service';
import { CardType } from './cards.enum';
import { ValidateCardType } from './validators/card-type.validator';
import { ValidateId } from './validators/card-id.validator';

@Controller('trello-manager')
export class CardsController {

    constructor(private cardsService: CardsService) { }
    
    @Post("")
    async createCard(@Body() body: CreateCardDto) {
        return await this.cardsService.createCard(body);
    }

    @Get("/:type")
    async getCards(@ValidateCardType() type: CardType) {
        return await this.cardsService.getCards(type);
    }

    @Get("/:type/:id")
    async getCard(@ValidateCardType() type: CardType, @ValidateId() id: number) {
        return await this.cardsService.getCard(type, id);
    }

    @Delete("/:type/:id")
    async deleteCard(@ValidateCardType() type: CardType, @ValidateId() id: number) {
        return await this.cardsService.deleteCard(type, id);
    }

}
