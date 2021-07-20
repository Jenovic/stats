import {
  Controller,
  Post,
  BodyParams,
  Get,
  PathParams,
  Response,
  HeaderParams,
} from '@tsed/common';
import { Description } from '@tsed/swagger';
import Course from '../models/Course';
import Session from '../models/StudySession';
import CourseManager from '../services/CourseManager';
import SessionManager from '../services/SessionManager';
import UserManager from '../services/UserManager';
import { idSchema, statsSchema } from '../tests/Course';

@Controller('/courses')
export default class CourseController implements IController<Course> {
  constructor(
    private courseManager: CourseManager,
    private sessionManager: SessionManager,
    private userManager: UserManager,
  ) {}

  /**
   * Fetch a list of courses
   */
  @Get('/')
  @Description('Get a list of courses')
  public async getAll() {
    return this.courseManager.findAll();
  }

  /**
   * Persists a session study event
   */
  @Post('/:uuid')
  @Description('Persists a session study event')
  public async addSession(
    @HeaderParams('x-user-id') userUuid: string,
    @PathParams('uuid') courseUuid: string,
    @BodyParams() fields: Partial<Session>,
    @Response() res,
  ) {
    // validate request header, path and body input parameters
    try {
      await idSchema.validateAsync(userUuid);
      await idSchema.validateAsync(courseUuid);
      await statsSchema.validateAsync(fields);
    } catch (err) {
      return res.status(400).send(err);
    }

    // identify the user
    const user = await this.userManager.find(userUuid);
    if (!user) return res.status(404).send('user not found');

    // identify the course
    const course = await this.courseManager.find(courseUuid);
    if (!course) return res.status(404).send('course not found');

    // Check if session with that id already exist. This is only really needed because we
    // are passing the session id as part of the body parameters
    const session = await this.sessionManager.find(fields.uuid);
    if (session) {
      return res
        .status(400)
        .send(`A study session with this id: ${fields.uuid} already exist.`);
    }

    try {
      await this.sessionManager.createSession(fields);
    } catch (e) {
      const errors = e.errors.map((error) => error.message);
      res.status(500).send(errors);
    }
    return res.status(201).send('OK');
  }

  /**
   * Fetches a course lifetime statistics
   */
  @Get('/:uuid')
  @Description('Fetches a course lifetime statistics')
  public async getStats(
    @HeaderParams('x-user-id') userUuid: string,
    @PathParams('uuid') courseUuid: string,
    @Response() res,
  ) {
    // validate request header, path and body input parameters
    try {
      await idSchema.validateAsync(userUuid);
      await idSchema.validateAsync(courseUuid);
    } catch (err) {
      return res.status(400).send(err);
    }

    // identify the user
    const user = await this.userManager.find(userUuid);
    if (!user) return res.status(404).send('user not found');

    // identify the course
    const course = await this.courseManager.find(courseUuid);
    if (!course) return res.status(404).send('course not found');

    // Get all study session for the selected user id and course id
    const sessions = await this.sessionManager.findAllStats(
      userUuid,
      courseUuid,
    );

    // define stats object
    let totalModulesStudied = 0;
    let averageScore = 0;
    let timeStudied = 0;
    const stats = {};

    // aggregate stats results
    sessions.map((session) => {
      totalModulesStudied = totalModulesStudied + session.totalModulesStudied;
      averageScore = averageScore + session.averageScore;
      timeStudied = timeStudied + session.timeStudied;
    });

    // update the stats object
    stats['totalModulesStudied'] = totalModulesStudied;
    stats['averageScore'] = averageScore;
    stats['timeStudied'] = timeStudied;

    res.status(200).send(stats);
  }

  /**
   * Fetches a course lifetime statistics
   */
  @Get('/:courseUuid/sessions/:sessionUuid')
  @Description('Fetches a course lifetime statistics')
  public async getSessionStat(
    @HeaderParams('x-user-id') userUuid: string,
    @PathParams('courseUuid') courseUuid: string,
    @PathParams('sessionUuid') sessionUuid: string,
    @Response() res,
  ) {
    // validate request header, path and body input parameters
    try {
      await idSchema.validateAsync(userUuid);
      await idSchema.validateAsync(courseUuid);
      await idSchema.validateAsync(sessionUuid);
    } catch (err) {
      return res.status(400).send(err);
    }

    // identify the user
    const user = await this.userManager.find(userUuid);
    if (!user) return res.status(404).send('user not found');

    // identify the course
    const course = await this.courseManager.find(courseUuid);
    if (!course) return res.status(404).send('course not found');

    // identify the session
    const session = await this.sessionManager.find(sessionUuid);
    if (!session) return res.status(404).send('session not found');

    // return stats
    const stats = {
      totalModulesStudied: session.totalModulesStudied,
      averageScore: session.averageScore,
      timeStudied: session.timeStudied,
    };

    return res.status(200).send(stats);
  }
}
