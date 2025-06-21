// cron/reminder.js
import cron from 'node-cron';
import Task from '../models/Task.js';
import Subscriber from '../models/Subscriber.js';
import { sendReminderEmail } from '../utils/email.js';

const startReminderCron = () => {
  cron.schedule('0 * * * *', async () => {
    const tasks = await Task.find({ completed: false });
    const subscribers = await Subscriber.find({ verified: true });
    for (const sub of subscribers) {
      await sendReminderEmail(sub.email, tasks);
    }
  });
};

export default startReminderCron;