import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  healthCheck() {
    console.log('Healthcheck: bonus-service');
    return 1;
  }

  @Get('test')
  async test() {
    return this.appService.test();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('bonus-topic')
  async handleBonusEvent(
      @Payload() value: unknown,
      @Ctx() context: KafkaContext,
  ) {
    console.log(`Received on ${context.getTopic()}[${context.getPartition()}]:`, value)
  }

  @EventPattern('TaskRating')
  async handleTaskRating(@Payload() value: unknown, @Ctx() context: KafkaContext) {
    console.log(`Received on ${context.getTopic()}[${context.getPartition()}]:`, value)
  }
}
