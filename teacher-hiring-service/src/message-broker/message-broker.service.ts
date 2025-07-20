import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import {KafkaClientService} from "src/message-broker/kafka-client.service";

type Topics = 'TaskRating';
@Injectable()
export class MessageBrokerService {
    constructor(private kafkaClient: KafkaClientService) {}

    async sendMessage(topic: Topics, message: string) {
        await this.kafkaClient.sendMessage(topic, message);
    }
}
