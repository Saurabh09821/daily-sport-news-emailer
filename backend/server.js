require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const sendDailyNewsEmails = require('./newMailer');

const Subscriber = require('./models/Subscriber');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Placeholder function to call Gemini API for summary
async function generateSummaryGemini(prompt) {
  // You must implement your Gemini API call here.
  // For now, let's simulate a summary:
  return `Summary based on: ${prompt.substring(0, 100)}...`;
}

// API to subscribe a user
app.post('/subscribe', async (req, res) => {
  try {
    const { name, email, preferences } = req.body;

    if (!name || !email || !preferences || preferences.length === 0) {
      return res.status(400).json({ message: 'Name, email, and preferences are required.' });
    }

    // Save subscriber or update if email exists
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      subscriber.name = name;
      subscriber.preferences = preferences;
      await subscriber.save();
    } else {
      subscriber = new Subscriber({ name, email, preferences });
      await subscriber.save();
    }

    res.status(200).json({ message: 'Subscription successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during subscription.' });
  }
});

// // Cron job to send daily summarized news email at 9 AM
// cron.schedule('0 9 * * *', async () => {
//   console.log('Running daily news email job...');

//   try {
//     const subscribers = await Subscriber.find();

//     for (const user of subscribers) {
//       const { name, email, preferences } = user;

//       let allNews = [];

//       for (const sport of preferences) {
//         const response = await axios.get('https://newsapi.org/v2/everything', {
//           params: {
//             q: sport,
//             language: 'en',
//             sortBy: 'publishedAt',
//             apiKey: process.env.NEWS_API_KEY,
//             pageSize: 5,
//           },
//         });

//         allNews = allNews.concat(response.data.articles);
//       }

//       if (allNews.length === 0) {
//         console.log(`No news found for ${email}`);
//         continue;
//       }

//       const headlines = allNews.map(article => `- ${article.title}`).join('\n');
//       const prompt = `Summarize these sports news headlines briefly:\n${headlines}`;

//       const summary = await generateSummaryGemini(prompt);

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your Daily Sports News Summary',
//         text: `Hi ${name},\n\nHere is your personalized sports news summary:\n\n${summary}\n\nEnjoy your day!`,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log(`Email sent to ${email}`);
//     }
//   } catch (err) {
//     console.error('Error in cron job:', err);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  sendDailyNewsEmails();
});
