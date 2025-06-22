// utils/email.js
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationEmail = async (email, code) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify?email=${email}&code=${code}`;
  await transporter.sendMail({
    from: 'no-reply@example.com',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click the link to verify: <a href="${verifyUrl}">Verify</a></p>`
  });
};

export const sendReminderEmail = async (email, tasks) => {
  const list = tasks.map(task => `<li>${task.name}</li>`).join('');
  const unsubscribeUrl = `${process.env.FRONTEND_URL}/unsubscribe?email=${email}`;
  await transporter.sendMail({
    from: 'no-reply@example.com',
    to: email,
    subject: 'Task Planner - Pending Tasks Reminder',
    html: `<h2>Pending Tasks Reminder</h2><ul>${list}</ul><p><a href="${unsubscribeUrl}">Unsubscribe from notifications</a></p>`
  });
};