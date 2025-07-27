import { Module } from '@nestjs/common';
import { PrismaDriverService } from '3-drivers/prisma-driver/prisma-driver.service';

@Module({
  providers: [PrismaDriverService],
})
export class PrismaDriverModule {}
