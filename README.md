
# PingPal

A modern full-stack MERN application for managing tasks with support for email subscription, verification, and hourly reminder notifications.

---

## 🚀 Features

✅ Add, complete, and delete tasks\
✅ Email subscription with verification\
✅ Hourly email reminders for incomplete tasks\
✅ Unsubscribe functionality\
✅ CRON-based reminder system\
✅ Admin email alerts on delivery failure\
✅ User-friendly UI with React

---

## 🧱 Tech Stack

**Frontend**

- React.js
- Axios
- Tailwind CSS

**Backend**

- Express.js (Node.js)
- MongoDB (MongoDB Atlas)
- Nodemailer (Gmail or Mailpit SMTP)
- node-cron

---

## 📁 Folder Structure

```
PingPal/
├── client/               # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
│
├── server/               # Express backend
│   ├── models/           # Mongoose schemas (Task, Subscriber)
│   ├── routes/           # API routes
│   ├── utils/            # Email sending functions
│   ├── cron/reminder.js  # Hourly reminder CRON job
│   ├── server.js
│   └── .env
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone & Install

```bash
git clone https://github.com/anuj34246/PingPal.git
cd PingPal
```

### 2️⃣ Start Backend

```bash
cd server
npm install
cp .env.example .env   # Then update .env with your credentials
npm start
```

### 3️⃣ Start Frontend

```bash
cd ../client
npm install
npm start
```

---

## 🔐 .env Configuration (Backend)

```env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
SMTP_USER=example@gmail.com
SMTP_PASS=your_16_digit_app_password
FRONTEND_URL=http://localhost:3000
```

---

## ⏰ CRON Job

The backend includes a CRON job that:

- Runs every hour
- Fetches all incomplete tasks
- Sends reminders to verified subscribers
- Retries once on failure and alerts the admin if it still fails

📍 Location: `server/cron/reminder.js`

---






## 🧪 Final Test Checklist

* [x] Add new tasks
* [x] Mark tasks complete/incomplete
* [x] Subscribe and verify email
* [x] Receive hourly reminders
* [x] Unsubscribe via email link
* [x] Admin alerted if reminders fail





---

## 🧑‍💻 Author

**Anuj Kumar**\
GitHub: [@anuj34246](https://github.com/anuj34246)