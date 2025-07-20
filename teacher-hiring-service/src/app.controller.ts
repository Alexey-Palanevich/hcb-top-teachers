import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService, SubmitTaskInput} from './app.service';

class SubmitTaskInputDto implements SubmitTaskInput {
  taskId: string;
  studentId: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthcheck() {
    console.log('Healthcheck: teacher-hiring');
    return 1;
  }

  @Post('submit-task')
  submitTask(@Body() dto: SubmitTaskInputDto) {
    return this.appService.submitTask(dto);

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
