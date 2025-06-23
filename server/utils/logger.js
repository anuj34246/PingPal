import fs from 'fs';
import path from 'path';

const logFile = path.resolve('logs.txt');

export const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ${message}\n`;
  fs.appendFile(logFile, log, (err) => {
    if (err) console.error('[LOGGER] Failed to write log:', err);
  });
};
