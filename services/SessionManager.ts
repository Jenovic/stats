import { Service } from '@tsed/di';
import StudySession from '../models/StudySession';

@Service()
export default class SessionManager implements IManager<StudySession> {
  findAll(...args: any): Promise<StudySession[]> {
    throw new Error('Method not implemented.');
  }

  public async find(uuid: string): Promise<StudySession> {
    return StudySession.findById(uuid);
  }

  public async createSession(
    fields: Partial<StudySession>,
  ): Promise<StudySession> {
    return StudySession.create(fields);
  }

  public async findAllStats(
    userId: string,
    courseId: string,
  ): Promise<StudySession[]> {
    return StudySession.findAll({
      where: { userUuid: userId, courseUuid: courseId },
    });
  }
}
