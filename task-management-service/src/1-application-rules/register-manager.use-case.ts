import { RegisterManagerUseCase } from '0-business-rules/managers/manager.entity';

export class RegisterManagerUseCaseImpl implements RegisterManagerUseCase {
  execute() {
    console.log('RegisterManagerUseCase execute');
  }
}
