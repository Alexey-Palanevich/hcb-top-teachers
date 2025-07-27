import { PrismaDriverService } from '3-drivers/prisma-driver/prisma-driver.service';
import { DbService } from '2-adapters/db/db.service';
import { RegisterManagerUseCaseImpl } from '1-application-rules/register-manager.use-case';

class RegisterManagerDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisterManagerUseCase {
  execute(): void;
}

export class ManagerEntity {
  constructor(
    private registerManagerUseCase: RegisterManagerUseCaseImpl,
    private db: DbService,
    private readonly prismaDriverService: PrismaDriverService,
  ) {}

  /**
   * Remember new manager
   */
  public register(dto: RegisterManagerDto) {
    console.log(dto);
  }
}
