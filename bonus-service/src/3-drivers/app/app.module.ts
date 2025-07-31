import { Module } from '@nestjs/common';
import { AppController } from '3-drivers/app/app.controller';
import { AppService } from '3-drivers/app/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
