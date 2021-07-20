interface IController<T> {
  add?(...args: any[]): Promise<T>;
  getAll(...args: any[]): Promise<T[]>;
  get?(uuid: string, ...args: any[]): Promise<T>;
  edit?(uuid: string, ...args: any[]): Promise<T>;
  delete?(uuid: string, ...args: any[]);
}
