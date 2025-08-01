import { Manager } from '0-business-rules/manager';

export class PaymentProvider {
  public pay(manager: Manager, amount: number) {
    // TODO: implement payment logic here
    console.log(`Manager ${manager.name} received ${amount}`);

    return true;
  }
}
