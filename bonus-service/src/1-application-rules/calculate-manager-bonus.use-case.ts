import { Bonus } from '0-business-rules/bonus';
import { History } from '0-business-rules/history';
import { Task } from '0-business-rules/task';

export interface BonusRepository {
  getManagerBonus(managerId: string): Bonus;
}
export interface HistoryRepository {
  getHistoryForManager(managerId: string): History;
}
export interface TaskRepository {
  getTask(taskId: string): Task;
}

export class CalculateManagerBonusUseCase {
  constructor(
    private readonly bonusRepository: BonusRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  execute(
    managerId: string,
    taskId: string,
    reason: 'TaskCreated' | 'CandidateSuccess' | 'CandidateFailure',
  ) {
    const bonus = this.bonusRepository.getManagerBonus(managerId);
    const task = this.taskRepository.getTask(taskId);

    switch (reason) {
      case 'CandidateSuccess':
        bonus.creditForCorrectSolution(task);
        break;
      case 'TaskCreated':
        bonus.creditForNewTask(task);
        break;
      case 'CandidateFailure':
        bonus.debitForFailedSolution();
    }
  }
}
