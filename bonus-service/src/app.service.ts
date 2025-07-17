import {Injectable, OnModuleInit} from '@nestjs/common';
import {Kafka, Producer} from "kafkajs";

@Injectable()
export class AppService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['broker:29092'],
  });

  private producer: Producer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();

    const admin = this.kafka.admin()
      await admin.connect();
    await admin.createTopics({
        topics: [
            {
                topic: "rating",
                numPartitions: 1,
                replicationFactor: 1
            }
        ],
        waitForLeaders: true
    });
    await admin.disconnect();
  }

  getHello(): string {
    return 'Hello World!';
  }

 async test() {
    const message = {
      userId: Math.floor(Math.random() * 1000),
      rating: Math.floor(Math.random() * 10) + 1,
    }

    await this.producer.send({
      topic: "rating",
      messages: [{value: JSON.stringify(message)}]
    })

   console.log("Rating: ", message)
  }
}
