import * as path from 'path';
import { ServerSettings, ServerLoader } from '@tsed/common';
import * as bodyParser from 'body-parser';
import '@tsed/swagger';
import connection from './database/connection';

const rootDir = path.resolve(__dirname);

require('dotenv').config();

// Init server
@ServerSettings({
  rootDir,
  port: process.env.API_PORT,
  acceptMimes: ['application/json'],
  mount: {
    '/': `${rootDir}/controllers/**/*.ts`,
  },
  swagger:
    process.env.NODE_ENV === 'development' ? [{ path: '/docs' }] : undefined,
})
class Server extends ServerLoader {
  public $beforeRoutesInit() {
    this.use(bodyParser.urlencoded({ extended: false }));
    this.use(bodyParser.json({ limit: '15MB', type: 'application/json' }));
    connection.sync({ force: false }).then(() => {
      console.log('tables created!');
    });
  }

  public $onReady() {
    console.log(`API online @ ${process.env.API_PORT}`);
  }

  public $onServerInitError(err) {
    console.error(err);
  }
}

// Start server
new Server().start();
