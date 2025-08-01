import { Task } from '0-business-rules/task';
import { History } from '0-business-rules/history';
import { PaymentProvider } from '0-business-rules/payment-provider';
import { Manager } from '0-business-rules/manager';

export class Bonus {
  static SUCCESSFUL_PAYMENT_AMOUNT = 100;

  static PENALTY_AMOUNT = 500;

  constructor(
    private readonly manager: Manager,
    private readonly history: History,
    private readonly paymentProvider: PaymentProvider,
  ) {}

  public creditForNewTask(task: Task) {
    const creditAmount = this.calculateCreditAmount(task);

    this.history.addRecord({
      reason: 'Crediting funds for writing a task',
      credit: creditAmount,
      debit: 0,
    });
  }

  public creditForCorrectSolution(task: Task) {
    const creditAmount = this.calculateCreditAmount(task);

    this.history.addRecord({
      reason: "Crediting funds for a student's correct homework solution",
      credit: creditAmount,
      debit: 0,
    });
  }

  private calculateCreditAmount(task: Task) {
    return task.rating === 0 || task.rating === 1
      ? Bonus.SUCCESSFUL_PAYMENT_AMOUNT / 100
      : Bonus.SUCCESSFUL_PAYMENT_AMOUNT;
  }

  public debitForFailedSolution() {
    this.history.addRecord({
      reason: "Waiving penalty for a student's incorrect homework solution",
      credit: 0,
      debit: Bonus.PENALTY_AMOUNT,
    });
  }

  public disburseFunds() {
    if (this.history.balance <= 0) {
      return;
    }

    const ok = this.paymentProvider.pay(this.manager, this.history.balance);

    if (ok) {
      this.history.addRecord({
        reason: 'Disbursing funds for manager',
        credit: 0,
        debit: this.history.balance,
      });
    } else {
      console.log('Payment failed');
    }
  }
}
