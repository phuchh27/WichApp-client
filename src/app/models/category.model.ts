export class Category {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class ICategory {
  public id?: number;
  public name: string;
  public store: number;

  constructor(id: number, name: string, store: number) {
    this.id = id;
    this.name = name;
    this.store = store
  }
}
