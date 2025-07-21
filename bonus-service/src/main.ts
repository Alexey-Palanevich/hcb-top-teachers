import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from './app.module';
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";


async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {brokers: ['broker:29092'], clientId: 'bonus-service'}, // like docker
            consumer: {
                groupId: "bonus-consumer-group"
            }
        }
    })
    await app.startAllMicroservices()
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap().then(() => {
    console.log('Bonus service started');
});
