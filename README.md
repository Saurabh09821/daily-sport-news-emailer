# 📰 Daily Sports News Mailer

**Daily Sports News Mailer** is a personalized email service that delivers daily sports news to users based on their preferences. Users choose their favorite sports and provide their email address via a frontend form. The system fetches the latest sports news using the **NewsAPI** and sends a daily email update using **Nodemailer**.

---

## 🚀 Features

- 🎯 Users select their favorite sports (e.g., Cricket, Football, Tennis)
- 📬 Sends personalized daily sports news to the user's email
- 📰 Uses [NewsAPI.org](https://newsapi.org/) to fetch real-time news
- 📩 Email delivery powered by **Nodemailer**
- 🧵 Frontend built with **React** and **custom CSS**
- ⏰ Daily news delivery scheduled via **Node cron job**

---

## 🛠 Tech Stack

| Component     | Technology Used           |
|---------------|----------------------------|
| Frontend      | React, CSS                 |
| Backend       | Node.js, Express.js        |
| API           | [NewsAPI.org](https://newsapi.org/) |
| Email Service | Nodemailer (SMTP)          |
| Scheduler     | node-cron                  |

---

## 📦 How It Works

1. User accesses the subscription form.
2. Chooses their favorite sports and enters an email address.
3. Preferences are saved on the server.
4. Every day:
   - Server fetches latest sports news via NewsAPI.
   - Sends an email summary to the user using Nodemailer.

---

## 📄 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Saurabh09821/daily-sport-news-emailer.git
cd daily-sport-news-emailer

