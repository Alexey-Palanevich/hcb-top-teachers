export class Manager {
  constructor(private readonly id: string, private readonly _name: string) {}

  get name() {
    return this._name;
  }
}
