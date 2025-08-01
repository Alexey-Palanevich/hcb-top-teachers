export class Task {
  constructor(
    private readonly id: string,
    private readonly _name: string,
    private readonly _rating: number,
  ) {}

  get name() {
    return this._name;
  }

  get rating() {
    return this._rating;
  }

  set rating(value) {
    if (value < 0 || value > 1) {
      throw new Error('Rating must be between 0 and 1');
    }
  }
}
