// server/cron/reminder.js
import cron from 'node-cron';
import Task from '../models/Task.js';
import Subscriber from '../models/Subscriber.js';
import { sendReminderEmail } from '../utils/email.js';

const startReminderCron = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      console.log(`[CRON] Running reminder at ${new Date().toLocaleString()}`);

      const tasks = await Task.find({ completed: false });
      if (!tasks.length) {
        console.log('[CRON] No pending tasks. Skipping reminder emails.');
        return;
      }

      const subscribers = await Subscriber.find({ verified: true });
      for (const sub of subscribers) {
        await sendReminderEmail(sub.email, tasks);
        console.log(`[CRON] Reminder sent to: ${sub.email}`);
      }

      console.log(`[CRON] Completed sending ${subscribers.length} reminder(s).`);
    } catch (err) {
      console.error('[CRON] Error during reminder job:', err);
    }
  });
};

export default startReminderCron;
