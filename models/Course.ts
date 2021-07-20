import * as Sequelize from 'sequelize';
import { Table, Model, Column } from 'sequelize-typescript';
import { Property } from '@tsed/common';

@Table({
  tableName: 'courses',
  timestamps: true,
  paranoid: true,
})
export default class Course extends Model<Course> implements ICourse {
  @Property()
  @Column({
    primaryKey: true,
    type: Sequelize.STRING,
  })
  public uuid: string;

  @Property()
  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      notEmpty: { msg: 'Name cannot be blank' },
    },
  })
  public name: string;
}
