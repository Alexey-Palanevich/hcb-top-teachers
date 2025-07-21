import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {brokers: ['broker:29092'], clientId: 'task-management-service'}, // like docker
      consumer: {
        groupId: "task-management-consumer-group"
      }
    }
  })
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap().then(() => {
  console.log('Task management service started');
});
