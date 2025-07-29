import { Controller, Get } from '@nestjs/common';
import { AppService } from '3-drivers/app/app.service';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  healthCheck() {
    console.log('Healthcheck: bonus-service');
    return 1;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('TaskRating')
  async handleTaskRating(
      @Payload() value: unknown,
      @Ctx() context: KafkaContext,
  ) {
    console.log(`Received on ${context.getTopic()}[${context.getPartition()}]:`, value);
  }
}
