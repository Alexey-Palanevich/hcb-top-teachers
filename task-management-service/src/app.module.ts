import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '2-adapters/db/db.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [DbModule],
})
export class AppModule {}
