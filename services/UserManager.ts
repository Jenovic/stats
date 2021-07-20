import { Service } from '@tsed/di';
import User from '../models/User';

@Service()
export default class UserManager implements IManager<User> {
  public async findAll(limit: number): Promise<User[]> {
    return User.findAll({ limit });
  }

  public async find(uuid: string): Promise<User> {
    return User.findById(uuid);
  }
}
