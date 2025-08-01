interface Record {
  timestamp: Date;
  reason: string;
  debit: number;
  credit: number;
}

export class History {
  constructor(
    private readonly managerId: string,
    private readonly records: string[],
  ) {}

  public addRecord(dto: Pick<Record, 'reason' | 'credit' | 'debit'>) {
    // TODO: implement history
    console.log(dto);
  }

  get balance() {
    // TODO: implement projection
    return 0;
  }
}
