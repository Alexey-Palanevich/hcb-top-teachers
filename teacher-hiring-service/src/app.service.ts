import { Injectable } from '@nestjs/common';
import {MessageBrokerService} from "src/message-broker/message-broker.service";

export interface SubmitTaskInput {
  taskId: string;
  studentId: string;
}

@Injectable()
export class AppService {
  constructor(
      private readonly messageBrokerService:MessageBrokerService
  ) {
  }
  getHello(): string {
    return 'Hello World!';
  }

  async submitTask(dto: SubmitTaskInput) {
    console.log('submitTask', dto);
    await this.messageBrokerService.sendMessage('TaskRating', Math.random().toPrecision(3))
    console.log('submitTask, done')
    return true
  }
}
