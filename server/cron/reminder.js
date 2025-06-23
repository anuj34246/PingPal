import cron from 'node-cron';
import Task from '../models/Task.js';
import Subscriber from '../models/Subscriber.js';
import { sendReminderEmail } from '../utils/email.js';
import { logToFile } from '../utils/logger.js';

const startReminderCron = () => {
  cron.schedule('0 * * * *', async () => {
    const runTime = new Date().toLocaleString();
    logToFile(`Starting CRON job at ${runTime}`);

    try {
      const tasks = await Task.find({ completed: false });
      if (!tasks.length) {
        logToFile('No pending tasks. Reminders skipped.');
        return;
      }

      const subscribers = await Subscriber.find({ verified: true });

      for (const sub of subscribers) {
        try {
          await sendReminderEmail(sub.email, tasks);
          logToFile(`Reminder sent to ${sub.email}`);
        } catch (err) {
          logToFile(`Failed to send to ${sub.email}. Retrying...`);

          try {
            await sendReminderEmail(sub.email, tasks);
            logToFile(`Retry success for ${sub.email}`);
          } catch (retryErr) {
            logToFile(`Retry failed for ${sub.email}: ${retryErr.message}`);
          }
        }
      }

      logToFile(`CRON job completed. Total subscribers processed: ${subscribers.length}`);
    } catch (err) {
      logToFile(`Fatal CRON error: ${err.message}`);
    }
  });
};

export default startReminderCron;
