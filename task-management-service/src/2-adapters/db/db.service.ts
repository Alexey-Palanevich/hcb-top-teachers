interface PrismaDriverService<T> {
  findById(id: string): Promise<T>;
}

export class DbService<T> {
  constructor(private readonly driverService: PrismaDriverService<T>) {}
}
