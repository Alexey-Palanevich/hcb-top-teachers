import { Module } from '@nestjs/common';
import { MessageBrokerService } from './message-broker.service';
import { KafkaClientService } from "src/message-broker/kafka-client.service";

@Module({
  providers: [MessageBrokerService, KafkaClientService],
  exports: [MessageBrokerService]
})
export class MessageBrokerModule {}
