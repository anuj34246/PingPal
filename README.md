# 📝 Task Scheduler with Email Reminders (MERN Stack)

A full-featured task management app built with MongoDB, Express, React, and Node.js. Users can add tasks and subscribe for hourly email reminders of incomplete tasks.

---

## 🔧 Features
- Add, delete, and mark tasks complete/incomplete
- Subscribe with email (with verification)
- Hourly email reminders for pending tasks
- Unsubscribe with 1-click

---

## 📁 Project Structure

```
.
├── server/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── cron/
│   └── server.js
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.js
```

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd your-repo-name
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-scheduler
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm start
```

App will run at: `http://localhost:3000`

---

## ⏰ CRON Jobs (Reminders)
Reminder system runs automatically every hour using `node-cron` in `server/cron/reminder.js`. No manual setup needed.

---

## 📬 Email Notes
- Uses Gmail SMTP (enable 2FA and generate App Password)
- Verification and reminder emails are sent in HTML format

---

## ✅ Routes Summary

### API Routes
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `POST /api/subscribers`
- `GET /api/subscribers/verify?email=&code=`
- `GET /api/subscribers/unsubscribe?email=`

### Frontend Routes
- `/` — Task Manager + Subscription
- `/verify?email=&code=` — Verifies subscription
- `/unsubscribe?email=` — Unsubscribes email

---

## 👨‍💻 Author
Developed as part of an assignment implementation in both PHP and MERN Stack.
