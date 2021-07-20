interface IManager<T> {
  findAll(...args: any): Promise<T[]>;
  find(uuid: string, ...args: any): Promise<T>;
  create?(fields: Partial<T>, ...args: any): Promise<T>;
  update?(uuid: string, fields: Partial<T>): Promise<T>;
  destroy?(uuid: string);
}
