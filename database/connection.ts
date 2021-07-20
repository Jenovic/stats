import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';

require('dotenv').config();

export default new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  modelPaths: [path.resolve(__dirname, '..', 'models', '*.ts')],
  define: {
    timestamps: true,
    paranoid: true,
  },
});
