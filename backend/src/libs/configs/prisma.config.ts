import { PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';

export class PrismaConfig implements PrismaOptionsFactory {
  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      explicitConnect: true,
      prismaOptions: {
        errorFormat: 'pretty',
        log: ['info'],
      },
    };
  }
}
