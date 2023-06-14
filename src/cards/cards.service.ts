import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dtos/create-card.dto';
import { CardType } from './cards.enum';
import { PrismaService } from './../../prisma/prisma.service';
import { 
    BugCard as BugCardModel,
    IssueCard as IssueCardModel, 
    TaskCard as TaskCardModel,
    Prisma } from '@prisma/client';



/**
 * This service is responsible for creating, reading and deleting cards.
 */
@Injectable()
export class CardsService {

    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    /**
     * This method creates a card based on the type of card.
     * 
     * @param {CreateCardDto} card - The card to be created.
     * @returns {Promise<IssueCardModel | TaskCardModel | BugCardModel >} The created card.
     */
    async createCard(card: CreateCardDto): Promise<IssueCardModel | TaskCardModel | BugCardModel> {
        switch (card.type) {
            case CardType.ISSUE:
                return this.createIssueCard(card);
            case CardType.TASK:
                return this.createTaskCard(card);
            case CardType.BUG:
                return this.createBugCard(card);
        };
    }

    /**
     * This method returns all cards of a given type.
     * 
     * @param {CardType} type - The type of card.
     * @returns {Promise<IssueCardModel[] | TaskCardModel[] | BugCardModel[]>} The cards of the given type.
     */
    async getCards(type: CardType): Promise<IssueCardModel[] | TaskCardModel[] | BugCardModel[]> {
        return this.prismaService[this.formatType(type)].findMany();
    }

    /**
     * This method returns a card of a given type and id.
     * 
     * @param {CardType} type - The type of card.
     * @param {number} id - The id of the card.
     * @returns {Promise<IssueCardModel | TaskCardModel | BugCardModel>} The card of the given type and id.
     */
    async getCard(type: CardType, id: number): Promise<IssueCardModel | TaskCardModel | BugCardModel> {
        const card = this.prismaService[this.formatType(type)].findUnique({ where: { id:Number(id) } });
        if (!card){
            throw new NotFoundException(`Card with id ${id} not found`);
        };
        return card;
    }

    /**
     * This method deletes a card of a given type and id.
     * 
     * @param {CardType} type - The type of card.
     * @param {number} id - The id of the card.
     */
    async deleteCard(type: CardType, id: number) {
        await this.prismaService[this.formatType(type)].delete(
            { 
                where: { id: Number(id) } 
            }
        ).catch(() => {
            throw new NotFoundException(`Card with id ${id} not found`);
        });
    }

    /**
     * This method validates the data of an issue card.
     * 
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateIssueCard(card: CreateCardDto) {
        if (!card.title || !card.description) {
            throw new BadRequestException('Title and description are required');
        }
    }

    /**
     * This method creates an issue card.
     * 
     * @param card - The card to be created.
     * @returns {Promise<IssueCardModel>} The created card.
     */
    async createIssueCard(card: CreateCardDto): Promise<IssueCardModel> {
        this.validateIssueCard(card);
        const issueCard = await this.prismaService.issueCard.create({
            data: {
                title: card.title,
                description: card.description,
            },
        });
        return issueCard;
    }

    /**
     * This method validates the data of a task card.
     *  
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateTaskCard(card: CreateCardDto) {
        if (!card.title || !card.category) {
            throw new BadRequestException('Title and category are required');
        }
    }

    /**
     * This method creates a task card.
     * 
     * @param card - The card to be created.
     * @returns {Promise<TaskCardModel>} The created card.
     */
    async createTaskCard(card: CreateCardDto): Promise<TaskCardModel> {
        this.validateTaskCard(card)
        const taskCard = await this.prismaService.taskCard.create({
            data: {
                title: card.title,
                category: card.category,
            },
        });
        return taskCard;
    }

    /**
     * This method validates the data of a bug card.
     * 
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateBugCard(card: CreateCardDto) {
        if (!card.description) {
            throw new BadRequestException('Description is required');
        }
    }

    /**
     * This method creates a bug card.
     * 
     * @param card - The card to be created.
     * @returns {Promise<BugCardModel>} The created card.
     * @todo Generate a random title function.
     */
    async createBugCard(card: CreateCardDto): Promise<BugCardModel> {
        this.validateBugCard(card);
        card.title = 'Bug'+'-'+'RandomWord'+'-'+ Math.floor(Math.random() * 1000);
        const bugCard = await this.prismaService.bugCard.create({
            data: {
                title: card.title,
                description: card.description,
            },
        });
        return bugCard;
    }

    /**
     * This method returns the Prisma model name based on the type.
     * 
     * @param {CardType} type - The type of card.
     * @returns {string} The Prisma model name.
     */
    private formatType(type: CardType) {
        return type.toLowerCase() + 'Card';
    }
}
