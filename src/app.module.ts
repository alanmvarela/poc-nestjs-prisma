import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { CardsModule } from './cards/cards.module';
import { ConfigModule } from '@nestjs/config';
import configs from './configs';

@Module({
  imports: [
    CardsModule,
    ConfigModule.forRoot({
      load: configs,
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
