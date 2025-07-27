import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  healthcheck() {
    console.log('Healthcheck: task-management-service');
    return 1;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
