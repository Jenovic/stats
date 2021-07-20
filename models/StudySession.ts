import * as Sequelize from 'sequelize';
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Property } from '@tsed/common';
import User from './User';
import Course from './Course';

@Table({
  tableName: 'study_sessions',
  timestamps: true,
  paranoid: true,
})
export default class StudySession extends Model<StudySession>
  implements IStudySession {
  @Property()
  @Column({
    primaryKey: true,
    type: Sequelize.STRING,
  })
  public uuid: string;

  @Property()
  @ForeignKey(() => User)
  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  })
  public userUuid: string;

  @BelongsTo(() => User, 'userUuid')
  public user: User;

  @Property()
  @ForeignKey(() => Course)
  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  })
  public courseUuid: string;

  @BelongsTo(() => Course, 'courseUuid')
  public course: Course;

  @Property()
  @Column({
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0,
  })
  public totalModulesStudied: number;

  @Property()
  @Column({
    type: Sequelize.FLOAT(4, 2).UNSIGNED,
    defaultValue: 0,
  })
  public averageScore: number;

  @Property()
  @Column({
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0,
  })
  public timeStudied: number;
}
