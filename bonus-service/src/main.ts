import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from './app.module';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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
    await app.listen(3000);
}
bootstrap();
