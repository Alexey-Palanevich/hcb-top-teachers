import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {Admin, Kafka, Producer} from "kafkajs";

@Injectable()
export class KafkaClientService implements OnModuleInit, OnModuleDestroy {
    private kafka: Kafka;
    private producer: Producer;
    private admin: Admin;

    async onModuleInit() {
        this.kafka = new Kafka({
            clientId: 'message-broker-service',
            brokers: ['broker:29092'],
        });

        this.producer = this.kafka.producer();
        await this.producer.connect();

        this.admin = this.kafka.admin();
        await this.admin.connect();

        await this.admin.createTopics({
            topics: [
                {
                    topic: 'rating',
                    numPartitions: 1,
                    replicationFactor: 1,
                },
            ],
            waitForLeaders: true,
        });

        await this.admin.disconnect();
    }

    async sendMessage(topic: string, message: string) {
        const response = await this.producer.send({
            topic,
            messages: [{ value: message }],
        });

        // TODO: handle errors
    }

    async onModuleDestroy() {
        await this.producer.disconnect();
    }
}