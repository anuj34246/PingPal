// routes/subscribers.js
import express from 'express';
import Subscriber from '../models/Subscriber.js';
import { sendVerificationEmail } from '../utils/email.js';
import crypto from 'crypto';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  const code = crypto.randomInt(100000, 999999).toString();

  let subscriber = await Subscriber.findOne({ email });
  if (!subscriber) {
    subscriber = new Subscriber({ email, verificationCode: code });
  } else {
    subscriber.verificationCode = code;
  }
  subscriber.verified = false;
  await subscriber.save();
  await sendVerificationEmail(email, code);
  res.status(200).json({ message: 'Verification sent' });
});

router.get('/verify', async (req, res) => {
  const { email, code } = req.query;
  const subscriber = await Subscriber.findOne({ email });
  if (!subscriber || subscriber.verificationCode !== code) {
    return res.status(400).json({ message: 'Invalid code' });
  }
  subscriber.verified = true;
  await subscriber.save();
  res.json({ message: 'Email verified' });
});

router.get('/unsubscribe', async (req, res) => {
  const { email } = req.query;
  await Subscriber.findOneAndDelete({ email });
  res.json({ message: 'Unsubscribed successfully' });
});

export default router;
