import winston from 'winston';
import path from 'path';
import { __dirname } from '../utils.js';
import { config } from '../config/config.js';
import { NODE_DEVELOPMENT } from '../clases/constant.js';

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'black',
    http: 'green',
    debug: 'white'
  }
}

winston.addColors(customLevels.colors);

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({level: 'debug'}), // a partir de cuando se va a mostrar
  ]
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.File({filename: path.join(__dirname, '/logs/errors.log'), level: 'info'})
  ]
})

let logger;
if (config.node.env === NODE_DEVELOPMENT){
  logger = devLogger;
} else {
  logger = prodLogger;
}

export { logger };
