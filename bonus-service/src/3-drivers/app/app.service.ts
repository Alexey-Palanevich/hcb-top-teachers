import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class AppService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'bonus-service-app',
    brokers: ['broker:29092'],
  });

  private producer: Producer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();

    const admin = this.kafka.admin();
    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: 'TaskRating',
          numPartitions: 1,
          replicationFactor: 1,
        },
      ],
      waitForLeaders: true,
    });
    await admin.disconnect();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
