import { Service } from '@tsed/di';
import Course from '../models/Course';

@Service()
export default class CourseManager implements IManager<Course> {
  public async findAll(): Promise<Course[]> {
    return Course.findAll();
  }

  public async find(uuid: string): Promise<Course> {
    return Course.findById(uuid);
  }
}
