import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ApiModule } from './api/api.module';
import { PrismaConfig } from './libs/configs/prisma.config';

@Module({
  imports: [
    ApiModule,
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
